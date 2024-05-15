import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CliComIssue} from '../../../../../shared/models/communications/client-company/cli-com-issue';
import {PaginationConfig} from '../../../../../shared/components/pagination/pagination.model';
import {Filter} from '../../../../../shared/components/pagination/filter.model';
import {ClientCompanyHelpService} from '../../../../../shared/services/client-company-help.service';
import {AlertService} from '../../../../../shared/alerts/services/alert.service';
import {takeUntil} from 'rxjs/operators';
import {PaginationResponse} from '../../../../../shared/models/pagination-response.model';
import {CliComMessage} from '../../../../../shared/models/communications/client-company/cli-com-message';
import {UserService} from '../../../../../shared/services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../../core/auth/models/user.model';
import {Helpers} from '../../../../../core/helpers';

@Component({
    selector: 'app-d-client-communications',
    templateUrl: './d-client-communications.component.html',
    styleUrls: ['./d-client-communications.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DClientCommunicationsComponent implements OnInit, OnDestroy {

    issues: CliComIssue[] = [];
    currentIssue: CliComIssue;
    paginationConfig: PaginationConfig = new PaginationConfig();
    filter: Filter = new Filter({
        search: '',
        per_page: 20
    });

    newMessage: CliComMessage;
    messageForm: FormGroup;

    @ViewChild('issuesList') issuesList: ElementRef;
    @ViewChild('messagesList') messagesList: ElementRef;

    loaded = false;
    loading = false;
    loadingCurrent = false;

    private unsubscribePagination = new EventEmitter();
    private unsubscribeShow = new EventEmitter();
    private unsubscribeAll = new EventEmitter();

    constructor(
        private _formBuilder: FormBuilder,
        private helpService: ClientCompanyHelpService,
        private alertService: AlertService,
    ) {
        this.resetNewMessage();
    }

    ngOnInit(): void {
        this.loadData();
        this.messageForm = this._formBuilder.group({
            message: ['']
        });
    }

    private loadData(page?): void {
        this.loading = true;
        this.helpService.issues({'page': page})
            .pipe(takeUntil(this.unsubscribePagination))
            .subscribe((d: PaginationResponse) => {
                this.issuesList.nativeElement.scrollTop = 0;
                this.issues = d.data.map(i => new CliComIssue(i));
                this.loaded = true;
                this.loading = false;
                this.paginationConfig.reload(d);
            }, err => {
                console.error(err);
                this.loading = false;
                this.alertService.alertError('error.on_loading_client_issues');
            });
    }

    ngOnDestroy(): void {
        this.unsubscribePagination.next();
        this.unsubscribePagination.complete();
        this.unsubscribeShow.next();
        this.unsubscribeShow.complete();
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    loadIssue(id: number): void {
        this.currentIssue = null;
        this.loadingCurrent = true;
        this.unsubscribeShow.next();
        this.helpService.show(id).pipe(takeUntil(this.unsubscribeShow))
            .subscribe(d => {
                this.currentIssue = new CliComIssue(d);
                this.loadingCurrent = false;
                setTimeout(() => {
                    this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
                }, 50);
            }, err => {
                console.error(err);
                this.loadingCurrent = false;
                alert('Error');
            });
    }

    isLastOfGroup(index: number): boolean {
        return this.currentIssue.messages.length - 1 === index ||
            (this.currentIssue.messages.length > index &&
                this.currentIssue.messages[index + 1].senderType !== this.currentIssue.messages[index].senderType);
    }

    resetNewMessage(): void {
        this.newMessage = new CliComMessage({
            client_id: UserService.userLocal().id
        });
    }

    sendMessage($event?: KeyboardEvent): void {
        const message = this.messageForm.get('message');
        const value = message.value;
        if ((!$event || !$event.shiftKey) && value) {
            const user = UserService.userLocal();
            const model = new CliComMessage({
                issue_id: this.currentIssue.id,
                client_id: this.currentIssue.client_id,
                senderType: 'client',
                message: value,
                sender: {
                    name: user.firstname + ' ' + user.lastname
                }
            });
            this.currentIssue.messages.push(model);
            const index = this.currentIssue.messages.length - 1;
            this.helpService.postMessage(this.currentIssue.id, value).pipe(takeUntil(this.unsubscribeAll))
                .subscribe((d: any) => {
                    this.messageForm.reset({message: ''}, {emitEvent: false});
                    console.log('============');
                    console.log(this.currentIssue.id, model.issue_id);
                    if(this.currentIssue.id === model.issue_id) {
                        console.log(index, this.currentIssue.messages[index].created_at, d.created_at);
                        this.currentIssue.messages[index].created_at = Helpers.parseDate(d.created_at);
                        console.log(index, this.currentIssue.messages[index].created_at);
                    }
                }, err => {
                    console.error(err);
                    this.alertService.alertError('error.on_sending_clientcompany_message');
                });
        }
    }

}
