import {FileItem, FileLikeObject, FileUploader, FileUploaderOptions, FilterFunction} from "ng2-file-upload";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http} from "@angular/http";
import {env} from "../../../environments/env";
import {EventEmitter} from "@angular/core";
import {UserService} from "../services/user.service";

export class AireFileUploader extends FileUploader {

    constructor(params:FileUploaderOptions,formData:any ){
        super(params);
        this.options.headers=[{name:'Accept',value:'application/json'}];
        this.formData=formData;
        this.authToken='Bearer '+UserService.userLocal().token;
        //this.options.maxFileSize=1 * 1024 * 1024;
        //this.setTestFilter();
    }
    private formData: any;
    public isUploading$: EventEmitter<boolean> =  new EventEmitter();
    public allCompleted$: EventEmitter<boolean> =  new EventEmitter();

    uploadAll(){
        this.isUploading$.next(true);
        super.uploadAll();
    }

    onCompleteAll(){
        this.isUploading$.next(false);
        this.allCompleted$.next(true);
    }


    onBuildItemForm  (fileItem: any, form: any) {

        if (this.formData) {
            Object.keys(this.formData).forEach(key => form.append(key, this.formData[key]));
        }
    }

    onAfterAddingFile(item:FileItem){
        // console.log(this);
        //  console.log(item);
    }
    onAfterAddingAll(fileItems: any){}

    setFormData(formData:object){
        this.formData=formData;
    }

    addToQueue(files, options, filters){

        let list = [];
        for (let _i = 0, files_1 = files; _i < files_1.length; _i++) {
            let file = files_1[_i];
            list.push(file);
        }
        let arrayOfFilters = this._getFilters(filters);
        let count = this.queue.length;
        let addedFileItems = [];
        list.map((some)=>{
            if (!options) {
                options = this.options;
            }
            let temp = new FileLikeObject(some);
            if (this._isValidFile(temp, arrayOfFilters, options)) {
                let fileItem = new FileItem(this, some, options);
                addedFileItems.push(fileItem);
                this.queue.push(fileItem);
                this._onAfterAddingFile(fileItem);
            }
            else {
                let filter = arrayOfFilters[this._failFilterIndex];
                this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload && this.queue.length > 0) {
            this.uploadAll();
        }
    }


    onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any){
        this.isUploading$.next(false);
        this.cancelAll();
        console.log("error al añadir",filter,options);
    }



}

