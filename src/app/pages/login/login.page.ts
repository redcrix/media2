import { Component, OnInit, DebugElement } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, Platform } from '@ionic/angular';
import { User } from '../../../providers';
//import { Settings } from '../../providers/settings/settings';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';
import { Api } from '../../../providers/api/api';
import { TokenModel } from '../../../models/TokenModel';
import { ApiParameters } from '../../../models/ApiParameters';
import { AccountModel } from '../../../models/AccountModel';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { AccessRightsModel } from '../../../models/AccessRightsModel';
import { Heplers } from '../../../providers/Helper/Helpers';
import { LoadingController } from '@ionic/angular';
import { AppSettings } from '../../config/globals';
import { PunchesService } from '../../../Services/PunchesService';
import { UserService } from '../../../Services/UserService';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import { Device } from '@ionic-native/device/ngx';
// chrome://inspect/#devices
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  enableLogin: boolean;
  tokenReponse: TokenModel;
  empResponse: EmployeeModel;
  Params: ApiParameters;
  deviceId: string;
  response: any;
  account: AccountModel = { empId: "", password: "", rembmerMe: false };

  // Our translated text strings
  private loginErrorString: string;
  private stval: string;
  public chachPassword: boolean;
  CheckLogin;
  loading: HTMLIonLoadingElement;

  constructor(public usrSer: UserService, private platform: Platform, public punchse: PunchesService, public loadingController: LoadingController, public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public storage: Storage,
    public alertCtrl: AlertController,
    private uniqueDeviceID: UniqueDeviceID,
    public Config: config, public api: Api, public helper: Heplers) {

    this.storage.get(this.Config.MainURL_Key).then((res) => {
      AppSettings.API_ENDPOINT = res;
    })
      .catch(err => this.helper.showMessage(err, "error Message"));

    this.storage.get(this.Config.Username_Key).then((res) => {



      if (res != "" && res != null && res != "null" && res != undefined) {
        //debugger;
        this.account = JSON.parse(res) as AccountModel;

        //this.doLogin();
      }

    });


    this.storage.get('TestOne').then((val) => {

      if (val != null) {
        this.account.empId = val;

      }
    });

    let empId = JSON.parse(localStorage.getItem('empId'));

    this.account.empId = empId;


    // this.storage.get('TestTwo').then((val) => {
    //   this.account.password = val;
    //   // alert('Your TestOne is'+ val);
    // });

    // if (this.account.empId != null && this.account.password != null) {

    // this.doLogin();

    // }




  }
  GetKey(res: any) {
    AppSettings.MAPS_API = res.result[0].mobile_gmap_api_key;
  }

  checkURL(res: string) {
    try {
      if (res == null || res == undefined) {
        this.helper.showMessage("null", "");
        this.enableLogin = false;
        return;
      }
      this.enableLogin = true;
      this.helper.showMessage(res, "");
    }
    catch (Error) {
      this.helper.showMessage(Error.message, "Login Error");
    }
  }


  validate(res: any, empId: string, Password: string) {

    this.helper.presentToast("Logging ...", 2000);
    // console.log('debug===1');
    try {
      ////debugger;
      this.tokenReponse = res as TokenModel;
      if (this.tokenReponse.code == '0') {


        AppSettings.IsLogedIn = true;
        this.api.callGet('/ivmtReader.dll/api/v52/ivmtReader/GetEmpInf?emp_id=' + empId
          + '&uuid=1213&apikey=' + config.APIKEY + '&fields=EMP_NAME,EMP_ID,DEPT_NAME,DEPT_ID,ORG_NAME,DOJ,STATUS&token=' + this.tokenReponse.result, "").subscribe((res) => {
            this.empResponse = ((res as any).result) as EmployeeModel;
            // console.log();
            let empNameFr = this.empResponse.EMP_NAME;
            let empDepFr = this.empResponse.DEPT_NAME;
            let empDesFr = this.empResponse.ORG_NAME;

            localStorage.setItem('nameOne', empNameFr);
            localStorage.setItem('nameTwo', empDepFr);
            localStorage.setItem('nameThree', empDesFr);

            this.storage.set('nameOne', '1');

            // Or to get a key/value pair
            this.storage.get('nameOne').then((val) => {
              console.log('Your nameOne is', val);
            });

            this.storage.set('nameTwo', '1');

            // Or to get a key/value pair
            this.storage.get('nameTwo').then((val) => {
              console.log('Your nameTwo is', val);
            });

            this.storage.set('nameThree', '1');

            // Or to get a key/value pair
            this.storage.get('nameThree').then((val) => {
              console.log('Your nameThree is', val);
            });
            // this.storage.set(this.Config.UserInformation, JSON.stringify(res as EmployeeModel))
            AppSettings.USERNAME = this.empResponse.EMP_NAME;
            AppSettings.DEPARTMENT = this.empResponse.DEPT_NAME;
            AppSettings.DEPARTMENT_ID = this.empResponse.DEPT_ID;
            AppSettings.EMPID = this.empResponse.EMP_ID;
            AppSettings.ORG_NAME = this.empResponse.ORG_NAME;
            AppSettings.DOJ = this.empResponse.DOJ;
            AppSettings.floatDOJ = this.empResponse.floatDOJ;
            AppSettings.STATE = this.empResponse.STATE;
            ////debugger;
          });

        this.Params = {
          ApiToken: this.tokenReponse.result,
          ApiKey: config.APIKEY,
          EmpId: empId
        }


        this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));
        console.log(res.result.AllowExcReq);



        localStorage.setItem('empId', empId);
        localStorage.setItem('ApiToken', this.tokenReponse.result);
        this.storage.set('empId', empId);
        this.storage.set('ApiToken', this.tokenReponse.result);

    

        let temp = this.account.rembmerMe;
        //debugger;
        if (this.account.rembmerMe == true) {
          this.storage.set(this.Config.Username_Key, JSON.stringify(this.account));
        }
        // this.storage.set(this.Config.ConnectionParameter, JSON.stringify(this.Params));

        this.punchse.GetMapAPIKEY(empId, config.APIKEY, this.tokenReponse.result).subscribe((res) => {
          this.GetKey(res);
        });

        this.usrSer.GetRightAccess(empId, config.APIKEY,
          this.tokenReponse.result).subscribe((res: any) => {

            console.log('RIGHT ACCESS DEBUG === '+JSON.stringify(res));




            AppSettings.permissions = res.result as AccessRightsModel
            //debugger;
            console.log(res.result);
            this.storage.set('allowExcReq', res.result.AllowExcReq);
            this.storage.set('allowGeoPunch', res.result.AllowGeoPunch);
            this.storage.set('allowPunchReq', res.result.AllowPunchReq);
            this.storage.set('allowVacReq', res.result.AllowVacReq);
     
            // 
            // alert('Storage = ' + JSON.stringify(this.storage));
            setTimeout(() => {

              this.navCtrl.navigateRoot('home', false, { replaceUrl: true });
            }, 1000);
            // 
          });
      }
      else {
        console.log('invalid');
        // this.helper.showMessage("Invalid Login", "Login Error");
      }
    }
    catch (Error) {
      this.helper.showMessage(Error.message + Error.stack, "validate function");
    }
  }


  doLogin() {
    try {
      let temp = AppSettings.API_ENDPOINT;
      ////debugger;
      this.presentLoading();
      if (this.account.empId != undefined || this.account.empId != "") {

        // localStorage.setItem('nameThree', empDesFr);

        // this.storage.set('TestOne', this.account.empId);
        // this.storage.set('TestTwo', this.account.password);

        // this.uniqueDeviceID.get()
        // .then(data => {
          this.usrSer.Login('4cc506b3-2a33-4f6a-98de-700f36438594', this.account.empId, this.account.password)
          .subscribe((res: any) => {

            let showErr = res.result;
            this.response = res;

            if (this.response.code == 0) {
              localStorage.removeItem('checkLogin_router');
              localStorage.setItem('checkLogin_router', '1');
               this.storage.set('checkLogin_router', 1);

              this.validate(res, this.account.empId, this.account.password);

              this.loading.dismiss();
             }
            else {
              this.loading.dismiss();
             this.helper.showMessage(showErr, 'Error');

            }
          });
        // }).catch(error => {
        //   console.log(error.status);
        // });

        // this.uniqueDeviceID.get()
        // .then((uuid: any) => {
        // 7a2323b6-5d94-e54e-3557-350963261398
        // this.deviceId=uuid
        // this.uniqueDeviceID.uuid
        // 4cc506b3-2a33-4f6a-98de-700f36438594
      
        // });


      }
    }
    catch (Error) {
      this.loading.dismiss();
      this.helper.showMessage(Error.message, "Login Error");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait....', duration: 4000
    });
    return await this.loading.present();
  }


  async DismissLoadingSpinner() {
    return await this.loadingController.dismiss();
  }


  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToForgotPassword() {
    // this.navCtrl.navigateRoot('/forgotPassword');
  }
  ngOnInit() {
    // document.querySelector('video').play();

    // this.onLoginForm = this.formBuilder.group({
    //   'email': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'password': [null, Validators.compose([
    //     Validators.required
    //   ])]
    // });
  }
  backButtonSubscription;
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeTablePage');
    //  this.LoadTimeTable();
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      //  alert("are");
      navigator['app'].exitApp();
    });
  }

}
