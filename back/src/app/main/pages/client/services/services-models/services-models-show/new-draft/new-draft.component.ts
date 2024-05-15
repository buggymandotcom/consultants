import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TaxModel} from "../../../../../../../shared/models/client/models/tax-model.model";
import {ClientService} from "../../../../../../../shared/services/client.service";

@Component({
  selector: 'app-new-draft',
  templateUrl: './new-draft.component.html',
  styleUrls: ['./new-draft.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewDraftComponent implements OnInit {

    action: string;
    client: number;
    newDraftForm: FormGroup;
    models: TaxModel[];
    selectedModel: TaxModel = new TaxModel();

    constructor(
        public matDialogRef: MatDialogRef<NewDraftComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private clientService: ClientService
    ) {
        this.action = _data.action;

        if ( this.action === 'new' ){
            this.client = _data.client;
        }

        this.newDraftForm = this.createNewDraftForm();
    }

    ngOnInit() {
        this.clientService.modelsAvailables(this.client).subscribe((models: TaxModel[]) => {
            this.models = models.map(e => new TaxModel(e));
        });
    }

    createNewDraftForm(): FormGroup{
        return this._formBuilder.group({
            model_id: [this.selectedModel.id]
        });
    };

}
