import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
import { Api } from '../../../providers/api/api';
import { Heplers } from '../../../providers/Helper/Helpers';
import { TokenModel } from '../../../models/TokenModel';
import { TimeTableModel } from '../../../models/TimeTableModel';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { ApiParameters } from '../../../models/ApiParameters';
import { AttendanceModel } from '../../../models/AttendanceModel';
import { PunchModel } from '../../../models//PunchModel';
import { TimeTableListModel } from '../../../models/TimeTableListModel';
import { AttendanceService } from '../../../Services/AttendanceService';
import { PunchesService } from '../../../Services/PunchesService';
import { TimeTableService } from '../../../Services/TimeTableService';
import { AttendanceStatisticsModel } from '../../../models/AttendanceStatisticsModel';
import { HelperService } from '../../../Services/HelperService';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {AppSettings} from '../../config/globals';
import { UserService } from '../../../Services/UserService';
import * as moment from 'moment-timezone';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  momentjs: any = moment;
  

  public radius       =    250;
    public stroke       =    "20" ;
    public semicircle   =    false;
    public rounded      =    true;
    public clockwise    =    false;
    public responsive   =    true;
    public duration     =    "800";
    public animation    =    'easeInOutQuart';

  
  account: { emp_id: string, emp_pwd: string, uuid: string, apikey: string, hash_ver: string } = {
    emp_id: "B00004",
    emp_pwd: "123",
    uuid: "1213",
    apikey: "8b50486998244ae4965678671206bbf3",
    hash_ver: "sha1"
  };
  DefaultDateFormat:string;
  DefaultTimeFormat:string;
  CurrentTab: string = "TimeTable";
  Currentchart: string = "Present";
  Peroid: string = "29";
  TTableModel: TimeTableModel[];
  AttendanceTab: AttendanceModel[];
  PunchTable: PunchModel[];
  TTListModel: TimeTableListModel[];
  Employee: EmployeeModel;
  parms: ApiParameters;
  temp: TokenModel;
  attSummary: AttendanceStatisticsModel = { absent: 0, absentWithDuity: 0, NoTT: 0, OffDays: 0, VacDays: 0, workedDays: 0, workedWithDelay: 0, workingDays: 0, absent_Per: 0, workedDays_Per: 0, absentWithDuity_Per: 0, VacDays_Per: 0, workedWithDelay_Per: 0, NoTT_Per: 0, OffDays_Per: 0, workingDays_Per: 0 };;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  dashbrd: string;


  constructor(public usrserv:UserService,public splash: SplashScreen, public helpService: HelperService, public TTSerivce: TimeTableService, public punservice: PunchesService, public AttService: AttendanceService, public navCtrl: NavController, public Config: config,
    public storage: Storage,
    //public setStorage: Settings, 
    public helper: Heplers, public api: Api,
    // public navParams: NavParams
    //, public translateService: TranslateService
  ) {
    this.storage.get(this.Config.UserInformation).then(res => this.MapEmp(res));
    this.storage.get(this.Config.ConnectionParameter).then(res => this.MapApiParm(res));

    //this.Peroid = 0;
    this.CurrentTab = "TimeTable";
    //this.LoadDateFormat();

    this.ReloadChart();

    

    //this.splash.show();
    //this.renderChart();
  }
  MapPunchTable(res: any) {
    ////debugger;
    if(res.code==0){
    this.PunchTable = res.result as PunchModel[];
    }
  }

  MapAttendanceTable(res: any) {
  
    if(res.code==0){
      console.log('datajj');
      console.log(AttendanceModel);
    this.AttendanceTab = res.result as AttendanceModel[];
    }
    else {
      // this.helper.ShowErrorMessage(res.code);
    }

  }

  MapApiParm(res: any) {

    this.parms = JSON.parse(res) as ApiParameters;
    this.GetTimeTable();
    this.GetAttendance();
    this.TodayPunches();
  }

  
  MapEmp(res: any) {
    this.Employee = JSON.parse(res).result as EmployeeModel;
    console.log("GetDateFormat",JSON.parse(res).result);
    this.helpService.GetDateFormat().subscribe((res)=>{
      this.DefaultDateFormat=(res as any).result[0].Date_Format;
      AppSettings.ServerDateFormat=this.DefaultDateFormat;
      this.storage.set("DateFormat",this.DefaultDateFormat);
    });

    this.helpService.GetTimeFormat().subscribe((res)=>{
      console.log("GettimeFormat",res);
      this.DefaultTimeFormat=(res as any).result[0].Time_Format;
      AppSettings.ServerTimeFormat=this.DefaultTimeFormat;
      this.storage.set("TimeFormat",this.DefaultTimeFormat);
    });

  }

  MapTimeTable(res: any) {
   // //debugger;
    this.TTableModel = res.result as TimeTableModel[];

  }

  MapTTListTable(res: any) {
    ////debugger;
    this.TTListModel = res.result as TimeTableListModel[];


  }



  GetTimeTable() {


    
    this.TTSerivce.GetTimeTableList(this.helper.GetOldDate(), this.helper.GetCurrentDate()).subscribe(res =>
      { 
        console.log("GetTimeTableList",res);
        this.MapTTListTable(res);
      });
  }

  GetAttendance() {
    console.log(this.helper.GetCurrentDate());
    this.AttService.GetAttendance(this.helper.GetOldDate(),
    this.helper.GetCurrentDate()).subscribe(res => 
      {
        console.log("GetAttendance",res);
        this.MapAttendanceTable(res);
        
      });
  }

  

  TodayPunches() {

    this.punservice.GetPunches(this.helper.getWeekStart(new Date()),
     this.helper.getWeekEnd(new Date())).subscribe(res => 
      {
        console.log("GetPunches",res);
        this.MapPunchTable(res);
      });
  }


  ReloadChart() {
  
    this.attSummary = { absent: 0, absentWithDuity: 0, NoTT: 0, OffDays: 0, VacDays: 0, workedDays: 0, workedWithDelay: 0, workingDays: 0, absent_Per: 0, workedDays_Per: 0, absentWithDuity_Per: 0, VacDays_Per: 0, workedWithDelay_Per: 0, NoTT_Per: 0, OffDays_Per: 0, workingDays_Per: 0 };
    this.ionViewDidLoad();
  }

  refreshPunches() {
    //this.helper.showMessage("refresh","refresh");
  }
  
  ionViewDidLoad() {

    this.AttService.GetAttendanceSummary(
      this.helper.getLastDaysDate(parseInt(this.Peroid)), 
      this.helper.GetCurrentDate()).then((res) => {
        console.log("GetCurrentDate",res);
      // res.subscribe((ret)=>{
      //  // //debugger;
      // });
      // this.SummaryModel = res.unsubscribe as AttendanceStatisticsModel;
    
      res.subscribe((ret) => {
        ////debugger;
        let obj = ret as any;
        let total_days = 0;

        obj.result.forEach(element => {
          total_days++;
          switch (element.AT_STATUS) {
            case 11:
              this.attSummary.OffDays++;
              break;
            case 1:
              this.attSummary.NoTT++;
              break;
            case 2:
              this.attSummary.workedDays++;
              break;
            case 5:
              this.attSummary.workedWithDelay++;
              break;
            case 6:
              this.attSummary.absent++;
              break;
            case 9:
              this.attSummary.VacDays++;
              break;
            case 12:
              this.attSummary.absentWithDuity++;
              break;
          }


        });
        this.attSummary.workingDays = total_days - (this.attSummary.VacDays + this.attSummary.OffDays);
        this.attSummary.workingDays_Per = (this.attSummary.workingDays / total_days) * 100;
        //this.attSummary.OffDays_Per = (this.attSummary.OffDays / total_days) * 100;
        this.attSummary.NoTT_Per = (this.attSummary.NoTT / total_days) * 100;
        this.attSummary.workedDays_Per = (this.attSummary.workedDays / total_days) * 100;
        this.attSummary.workedWithDelay_Per = (this.attSummary.workedWithDelay / total_days) * 100;
        this.attSummary.absent_Per = (this.attSummary.absent / total_days) * 100;
        this.attSummary.VacDays_Per = (this.attSummary.VacDays / total_days) * 100;
        this.attSummary.absentWithDuity_Per = (this.attSummary.absentWithDuity / total_days) * 100;
        //this.renderChart();
      });


    });


    console.log('ionViewDidLoad DashboardPage');

  }

  TimeTablePage() {
    this.navCtrl.navigateRoot("TimeTablePage");
  }

  GeoPunchPage() {
    this.navCtrl.navigateRoot("PunchingPage");
  }

  

  ngOnInit() {

   

  }

getcenterStyle()
{
  return {  
    'text-align':'center'
  };
}
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(150%) ') + 'translateX(0%)';

    return {
      // 'top': isSemi ? 'auto' : '50%',
      // 'bottom': isSemi ? '5%' : 'auto',
      // 'left': '50%',
      // 'text-align': 'center',
      'transform': transform,
      // '-moz-transform': transform,
      // '-webkit-transform': transform,
      // 'font-size': this.radius / 7 + 'px'
      'text-align':'center'
    };
}


}
