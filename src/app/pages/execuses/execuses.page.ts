import { Component, OnInit, NgZone } from '@angular/core';
import { ExecuseService } from '../../../Services/ExecuseService';
import { ExecuseModel } from '../../../models/ExecuseModel';
import { ReasonsModel } from '../../../models/ReasonsModel';
import { ExecuseListModel } from '../../../models/ExecuseListModel';
import { DateComponent } from '../../../models/DateComponent';
import { Heplers } from '../../../providers/Helper/Helpers';
import { NavController} from '@ionic/angular';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-execuses',
  templateUrl: './execuses.page.html',
  styleUrls: ['./execuses.page.scss'],
})
export class ExecusesPage implements OnInit {
  momentjs: any = moment;
  
  excModel: ExecuseModel = { to_time: new Date().toISOString(), desc: "", from_time: new Date().toISOString(), reason_id: 0, excuse_date: new Date().toISOString(), pay_status: 0 }
  resons: ReasonsModel[];
  exList: ExecuseListModel[];
  dateComp: DateComponent = { from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] };
  DefaultDateFormat:string;
  DefaultTimeFormat:string;

  constructor(public helper: Heplers,private zone: NgZone, public excService: ExecuseService, public navCtrl: NavController) {
    //this.LoadResons();
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });
    helper.GetTimeFormat().then((res)=>{
      this.DefaultTimeFormat=res;
    });
  }

  LoadExecuses() {
    this.zone.run(() => {
       this.excService.GetExecuseList(this.dateComp.from, 
      this.dateComp.to).subscribe((res: any) => {
        console.log(res);
        console.log(this.dateComp.from);
        console.log(this.dateComp.to);
      //debugger;
      if (res.code == 0) {
        //debugger;
        this.exList = res.result as ExecuseListModel[];
        console.log(this.exList);
      }
      else {
        this.helper.ShowErrorMessage(res.code);
      }

    });
  });
  }


  // LoadResons() {
  //   this.excService.GetReasonList().then((res) => {
  //     res.subscribe((resons) => {
  //       this.resons = (resons as any).result as ReasonsModel[];
  //       //debugger;
  //     });
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcusesPage');
  }

  ngOnInit() {
  }

}
