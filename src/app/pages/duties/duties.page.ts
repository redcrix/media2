import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController, ModalController,NavParams } from '@ionic/angular';
import { LeaveModel } from '../../../models/LeaveModel';
import { DateComponent } from '../../../models/DateComponent';
import { LeavesService } from '../../../Services/LeavesService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { TranslateService } from '@ngx-translate/core';
import { DutiesListModel } from '../../../models/DutiesListModel';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-duties',
  templateUrl: './duties.page.html',
  styleUrls: ['./duties.page.scss'],
})
export class DutiesPage implements OnInit {
  momentjs: any = moment;
  DutiyList: DutiesListModel[];
 // dateComp: DateComponent = { from: new Date().toISOString().split('T')[0], to: new Date().toISOString() };
 dateComp: DateComponent = { from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] };
  
 DefaultDateFormat:string;
  
  constructor(public helper: Heplers,private zone: NgZone, public LevService: LeavesService, public navCtrl: NavController) {
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });
  }


  MapDutiesListTable(res: any) {

    console.log('DEBUGGG==',res);
    //debugger;
    if (res.code == 0) {
      this.DutiyList = res.result as DutiesListModel[];

      console.log('DEBUGGG=='+this.DutiyList);
      console.log(JSON.stringify(this.DutiyList));
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }

  }


  GetDutiesList() {
    this.zone.run(() => {
    this.LevService.GetDutyList(this.dateComp.from, this.dateComp.to).subscribe((res) => {
      //debugger;
      this.MapDutiesListTable(res);
    });
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DutiesPage');
  }

  ngOnInit() {
  }

}
