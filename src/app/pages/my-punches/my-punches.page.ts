import { Component, OnInit, NgZone } from '@angular/core';
import { DateComponent } from '../../../models/DateComponent';
import { PunchesService } from '../../../Services/PunchesService';
import { Heplers } from '../../../providers/Helper/Helpers';
import { PunchModel } from '../../../models/PunchModel';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

import * as moment from 'moment-timezone';



@Component({
  selector: 'app-my-punches',
  templateUrl: './my-punches.page.html',
  styleUrls: ['./my-punches.page.scss'],
})
export class MyPunchesPage implements OnInit {
  momentjs: any = moment;
  
  setPrompt;

  ngOnInit() {
  }

  PunchTable: PunchModel[];
  DefaultDateFormat:string;
  DefaultTimeFormat:string;
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };

  constructor(public helper: Heplers,private zone: NgZone,public punchService: PunchesService, public navCtrl: NavController) {
    this.dateComp.from=this.helper.SubDays(7,new Date()).toISOString();
    helper.GetDateFormat().then((res)=>{
      this.DefaultDateFormat=res;
    });
    helper.GetTimeFormat().then((res)=>{
      this.DefaultTimeFormat=res;
    });
  }


  MapPunchTable(res: any) {
    //debugger;
    if (res.code == 0) {
      this.PunchTable = res.result as PunchModel[];
      console.log(this.PunchTable);

      console.log(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      
    }
    else {
      this.helper.ShowErrorMessage(res.code);
    }

  }


  GetPunches() {

    this.zone.run(() => {
      this.punchService.GetPunches(this.dateComp.from.slice(0, 10),
      this.dateComp.to.slice(0, 10)).subscribe(res =>
        {
  //         // console.log('RESPONSE==='+JSON.stringify(res));
  //         const mapped = Object.entries(res).map(([type, value]) => ({type, value}));
  
  // console.log(mapped);
  // let newVAL = mapped.splice(0,1); 
  // console.log('2 CUT===RESPONSE==='+newVAL);
  // console.log('2 CUT JSON===RESPONSE==='+JSON.stringify(res[0].result.value));


          this.setPrompt = console.log(res);
          // this.helper.presentToast(res[0].result.value, 2000);
           this.MapPunchTable(res);

          });
        });

        
    // this.zone.run(() => {
    //    this.punchService.GetPunches(this.dateComp.from.toString(), this.dateComp.to.toString()).subscribe(res => 
      
    //     this.MapPunchTable(res));
    // });
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPunchingPage');
  }

}
