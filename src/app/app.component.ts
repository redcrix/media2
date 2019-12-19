import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';

import { Platform, NavController, ModalController, MenuController, ActionSheetController, PopoverController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { Pages } from './interfaces/pages';

import { EmployeeModel } from '../models/EmployeeModel';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';
import { config } from '../providers/Config';
import { Heplers } from '../providers/Helper/Helpers';
import { AppSettings } from '../app/config/globals';
import { Router } from '@angular/router';
import messages from './providers/message/mock-messages';
import { Toast } from '@ionic-native/toast/ngx';
import { AccessRightsModel } from '../models/AccessRightsModel';
import { TimeTableService } from '../Services/TimeTableService';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages: Array<Pages>;
  lastTimeBackPress = 0;
  rootPage:any;
    timePeriodToExit = 2000;
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  // public listing;
  allowExcReq:any;
  allowGeoPunch:any;
  allowPunchReq:any
  allowVacReq:any;
  checkLogin_router;
  checkLogin_router2;
  signUpBtn :boolean;

  CurrentEmp: EmployeeModel = { EMP_ID: "", DEPT_NAME: "", DEPT_ID: "", EMP_NAME: "", ORG_NAME: "", DOJ: "", floatDOJ: "", STATE: "" };
  constructor(
    public helper: Heplers,
    public storage: Storage,
    public Myconfig: config,
    //private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public navCtrl: NavController,
    public TTSerivce: TimeTableService,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private toastCtrl: ToastController,
    private toast: Toast
    
  ) {

    this.checkLogin_router = JSON.parse(localStorage.getItem('checkLogin_router'));

    if(AppSettings.IsLogedIn)
    {
      console.log('IsLogedIn');

    this.signUpBtn = true;
    } else{
      this.signUpBtn = false;
    } 


    if(this.checkLogin_router === 'null'){
      console.log('Nothing');
    }
  
  
//debugger;

    this.appPages = [
      {
        title: 'Dashboard',
        url: 'Dashboard',
        direct: 'root',
        icon: 'speedometer',
        pageName: 'dashboard'
      
      }
      ,
      {
        title: 'Home',
        url: 'home',
        direct: 'forward',
        icon: 'home',
        pageName: 'home'
      },
      {
        title: 'Attendance',
        url: 'attendance',
        direct: 'forward',
        icon: 'alarm',
        pageName: 'attendance'
      },

      {
        title: 'Timetable',
        url: 'TimeTable',
        direct: 'forward',
        icon: 'logo-buffer',
        pageName: 'timetable'
      },
      {
        title: 'My Punches',
        url: 'MyPunches',
        direct: 'forward',
        icon: 'finger-print',
        pageName: 'my_punches'
      },
      {
        title: 'Leaves',
        url: 'Leaves',
        direct: 'forward',
        icon: 'sunny',
        pageName: 'leaves'
      },
      {
        title: 'Execuses',
        url: 'Execuses',
        direct: 'forward',
        icon: 'walk',
        pageName: 'execuses'
      }
      ,
      {
        title: 'Duties',
        url: 'Duties',
        direct: 'forward',
        icon: 'briefcase',
        pageName: 'duties'
      },
      {
        title: 'Request Status',
        url: 'RequestStatus',
        direct: 'forward',
        icon: 'trending-up',
        pageName: 'request_status'
      }
      ,
      {
        title: 'Geo Punching',
        url: 'geo-punching',
        direct: 'forward',
        icon: 'map',
        pageName: 'geo_punching'
      },

      {
        title: 'Execuse Request',
        url: 'submit-execuse',
        direct: 'forward',
        icon: 'calendar',
        pageName: 'execuse_request'
      }
      ,
      {
        title: 'Manual Adjustment Request',
        url: 'manual-adjustment-request',
        direct: 'forward',
        icon: 'clock',
        pageName: 'manual_adjustment_request'
      }
      ,
      {
        title: 'Leave Request',
        url: 'submit-leave-resuest',
        direct: 'forward',
        icon: 'paper',
        pageName: 'leave_request'
      }
      ,
      {
        title: 'Change Password',
        url: 'change-password',
        direct: 'forward',
        icon: 'key',
        pageName: 'change_password'
      },

      
      {
        title: 'Sign Out',
        url: 'login',
        direct: 'forward',
        icon: 'key',
        pageName: 'signOut'
      }

    ];
    // platform.ready().then(() => {

    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();

    // this.androidPermissions.requestPermissions(
    //   [
    //     this.androidPermissions.PERMISSION.CAMERA,
    //     this.androidPermissions.PERMISSION.CALL_PHONE,
    //     this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    //     this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    //   ]
    // );


    // });

    this.initializeApp();

    this.CurrentEmp.EMP_NAME = AppSettings.USERNAME;
    this.CurrentEmp.DEPT_NAME = AppSettings.DEPARTMENT;
    //debugger;
    this.storage.get(this.Myconfig.UserInformation).then(res => console.log(res));
  }
//   sh(res: any) {
// console.log(res);
// console.log(JSON.stringify(res));
//     this.CurrentEmp = JSON.parse(res).result as EmployeeModel;
//     console.log(this.CurrentEmp);
//     //debugger;

//   }

  checkacess(){
    this.storage.get('allowExcReq');
    this.storage.get('allowGeoPunch');
    this.storage.get('allowPunchReq');
    this.storage.get('allowVacReq');
    this.storage.get('allowGeoPunch').then(
      res =>{
        // this.sh(res)
        console.log(res);
      } )
  }
  
  testreqGeoPunch()
  {
    this.storage.get('allowGeoPunch').then(
      res =>{
        console.log(res);
      
    if(res == -1){

      this.navCtrl.navigateRoot('/geo-punching');
      }
      else{
        alert("your not allowed to this action");

      }
    } );
  }
  testreqExcReq()
  {
    this.storage.get('allowExcReq').then(
      res =>{
        console.log(res);
      
    if(res == -1){
  
      this.navCtrl.navigateRoot('/submit-execuse');
      }
      else{
        alert("your not allowed to this action");

      }
    });
  }
  testreqPunchReq()
  {
    this.storage.get('allowPunchReq').then(
      res =>{
        console.log(res);
      
    if(res == -1){
   
      this.navCtrl.navigateRoot('/manual-adjustment-request');
      }
      else{
        alert("your not allowed to this action");

      }
    });
  }

  testreqVacReq()
  {
    this.storage.get('allowVacReq').then(
      res =>{
        console.log(res);
      
    if(res == -1){
    
      this.navCtrl.navigateRoot('/submit-leave-resuest');
      }
      else{
        alert("your not allowed to this action");

      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {

      
      // this.backButtonEvent();
      // this.platform.backButton.subscribe(() => {
      //   //debugger;
      //   this.storage.remove(this.Myconfig.Username_Key);
      //   this.navCtrl.navigateRoot('home');
      // });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // if(AppSettings.IsLogedIn)
      // if(AppSettings.IsLogedIn)
    // {
      // this.navCtrl.navigateRoot('home');
      // this.rootPage='home';
    // }
    // else
    // {
      // this.navCtrl.navigateRoot('login');
      // this.rootPage='login';
    // }
     

      //  this.androidPermissions.requestPermissions(
      // [
      //   this.androidPermissions.PERMISSION.CAMERA,
      //   this.androidPermissions.PERMISSION.CALL_PHONE,
      //   this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      //   this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
      //   this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      // ])


      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });


    this.storage.get('checkLogin_router').then((val) => {
      console.log('Your checkLogin_router is', val);
      this.checkLogin_router2 = val;
    });


    this.checkLogin_router = JSON.parse(localStorage.getItem('checkLogin_router'));

    if(this.checkLogin_router === 'null'){
      console.log('Nothing');
    }

    // iphone
    this.storage.get('TestOne').then((val) => {

      if(val != null){
        this.navCtrl.navigateRoot('/login');
      }
    });


   



    if(this.checkLogin_router === 1 || this.checkLogin_router2 ===1){
     
  
      this.navCtrl.navigateRoot('/login');

    }

  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.storage.remove(this.Myconfig.Username_Key);  
    this.storage.remove('checkLogin_router');  
    
    
    this.storage.remove('ConnPar');  
    this.storage.remove('TestOne');  
    this.storage.remove('nameOne');  
    this.storage.remove('nameTwo');  
    this.storage.remove('nameThree');  
    this.storage.remove('empId');  
    this.storage.remove('ApiToken');  
    localStorage.removeItem('checkLogin_router');
    localStorage.removeItem('empId');
    localStorage.removeItem('ApiToken');
    localStorage.removeItem('nameOne');
    localStorage.removeItem('nameTwo');
    localStorage.removeItem('nameThree');
    AppSettings.IsLogedIn=false;
    this.navCtrl.navigateRoot('login',false, {replaceUrl: true});

  }
  goToPage(PageName: string) {

    console.log(1);
    
  let TempV = false;

    if(PageName === 'signOut')
    {

      TempV = true;
      this.logout();
    }

    if(PageName === 'geo-punching')
    {

      TempV = true;
      this.testreqGeoPunch();
    }

    if(PageName === 'submit-execuse')
    {
      TempV = true;

      this.testreqExcReq();
    }

    if(PageName === 'manual-adjustment-request')
    {

      TempV = true;
      this.testreqPunchReq();
    }

    if(PageName === 'submit-leave-resuest')
    {

      TempV = true;
      this.testreqVacReq();
    }

    

    if(AppSettings.IsLogedIn &&  TempV == false)
    {
      console.log(2);
      
      this.navCtrl.navigateRoot(PageName);
    }


    if(!AppSettings.IsLogedIn)
    {

      console.log(4);
      this.navCtrl.navigateRoot('login');
    }
    
  }
  changepassword(){
    this.navCtrl.navigateRoot('change-password');
  }
   // active hardware back button
    backButtonEvent() {
      this.platform.backButton.subscribe(async () => {
          // close action sheet
          try {
              const element = await this.actionSheetCtrl.getTop();
              if (element) {
                  element.dismiss();
                  return;
              }
          } catch (error) {
          }

          // close popover
          try {
              const element = await this.popoverCtrl.getTop();
              if (element) {
                  element.dismiss();
                  return;
              }
          } catch (error) {
          }

          // close modal
          try {
              const element = await this.modalCtrl.getTop();
              if (element) {
                  element.dismiss();
                  return;
              }
          } catch (error) {
              console.log(error);

          }

          // close side menua
          try {
              const element = await this.menu.getOpen();
              if (element) {
                  this.menu.close();
                  return;

              }

          } catch (error) {

          }

          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
              if (outlet && outlet.canGoBack()) {
                  outlet.pop();

              } else if (this.router.url === '/home') {
                  if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                      // this.platform.exitApp(); // Exit from app
                      // navigator['app'].exitApp(); // work in ionic 4
                    console.log('No Exit App');
                  } else {
                      this.toast.show(
                          `Press back again to exit App.`,
                          '2000',
                          'center')
                          .subscribe(toast => {
                              // console.log(JSON.stringify(toast));
                          });
                      this.lastTimeBackPress = new Date().getTime();
                  }
              }
          });
      });
  }
}
