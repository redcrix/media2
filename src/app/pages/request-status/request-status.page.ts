import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController,NavParams } from '@ionic/angular';
import { DateComponent } from '../../../models/DateComponent';
import { Heplers } from '../../../providers/Helper/Helpers';
import { RequestService } from '../../../Services/RequestService';
import { RequestStatusModel } from '../../../models/RequestStatusModel';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.page.html',
  styleUrls: ['./request-status.page.scss'],
})
export class RequestStatusPage implements OnInit {
  momentjs: any = moment;
  
  RequestList: RequestStatusModel[];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };

  constructor(public helper: Heplers, public reqService: RequestService, public navCtrl: NavController) {
  
    
  }

  MapRequestListTable(res: any) {
    
    if (res.code == 0) {
      this.RequestList =Array.of(res.result) as RequestStatusModel[];

      console.log(this.RequestList);
      // debugger;
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }




  }

  GetRequestStatus() {
    this.reqService.GetRequestStatus(this.dateComp.from.slice(0, 10), this.dateComp.to.slice(0, 10)).subscribe(res => this.MapRequestListTable(res));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestStatusPage');
  }

  ngOnInit() {
  }

}
