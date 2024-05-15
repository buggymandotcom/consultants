import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {env} from "../../../../environments/env";

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent implements OnInit
{
    /**
     * Constructor
     */
    public version:string;
    constructor(private http:HttpClient)
    {
    }


    ngOnInit(): void {

         //Obtenemos la version
        this.http.get<any>(env.baseEndPoint+'/appinfo').subscribe(d=>{
            this.version=d.version;
        });

    }
}
