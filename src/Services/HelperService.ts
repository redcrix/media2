import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Api } from '../providers/api/api';
import { ApiParameters } from '../models/ApiParameters';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HelperService {
    parms: ApiParameters;
  

    constructor(public Config: config, public api: Api, public storage: Storage) {
        this.storage.get(this.Config.ConnectionParameter).then(res=>this.MapApiParm(res));  
        this.LoadParms();
    }

    LoadParms(): Promise<string> {
        return this.storage.ready().then(() => this.storage.get(this.Config.ConnectionParameter));
    }

    MapApiParm(res: any) {
        this.parms = JSON.parse(res) as ApiParameters;        
    }

    GetTimeFormat() {
        let empId =  JSON.parse(localStorage.getItem('empId'));
        let ApiToken = localStorage.getItem('ApiToken');
        
        return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/GetTimeFormat',
        'emp_id=' + empId + '&apikey=' + config.APIKEY + '&token=' + ApiToken)
    }
    
    GetDateFormat() {
        let empId =  JSON.parse(localStorage.getItem('empId'));
        let ApiToken = localStorage.getItem('ApiToken');

        //                       ivmtwebsdk/ivmtReader.dll/api/v52/ivmtReader/GetTimeFormat
        return this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/GetDateFormat',
        'emp_id=' + empId + '&apikey=' + config.APIKEY + '&token=' + ApiToken)
    }

    CheckTimeFormat(mainURL:string) {
        // debugger;
        console.log(mainURL+'/ivmtReader.dll/api/v52/ivmtReader/GetTimeFormat');
        return this.api.callGetWithoutMainURL(mainURL+'/ivmtReader.dll/api/v52/ivmtReader/GetTimeFormat',
       '')
       // 'emp_id=' + this.parms.EmpId + '&apikey=' + this.parms.ApiKey + '&token=' + this.parms.ApiToken
    }


}