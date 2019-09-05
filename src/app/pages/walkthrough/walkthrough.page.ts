import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Heplers } from '../../../providers/Helper/Helpers';
import { config } from '../../../providers/Config';
import { Api } from '../../../providers/api/api';
import { TokenModel } from '../../../models/TokenModel';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AppSettings} from '../../config/globals';
@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  enableLogin: boolean;
  empResponse: EmployeeModel;
  currentUsernmae: string;
  CurrentPassword: string
  tokenReponse: TokenModel;
  checkLogin_router;
  checkLogin_router2;

  constructor(private platform: Platform,private geolocation: Geolocation,public navCtrl: NavController, public Config: config, public api: Api, public helper: Heplers, public config: config, public storage: Storage) {

    this.storage.get('checkLogin_router').then((val) => {
      console.log('Your checkLogin_router is', val);
      this.checkLogin_router2 = val;
    });


    this.checkLogin_router = JSON.parse(localStorage.getItem('checkLogin_router'));

    if(this.checkLogin_router === 'null'){
      console.log('Nothing');
    }

    // iphone
    // this.storage.get('TestOne').then((val) => {

    //   if(val != null){
    //     this.navCtrl.navigateRoot('/login');
    //   }
    // });



    if(this.checkLogin_router === 1 || this.checkLogin_router2 ===1){
      AppSettings.IsLogedIn=true;

  
      this.navCtrl.navigateRoot('/login');

    }

  

    // debugger;
    this.LoadMainURL();
    platform.ready().then(() => {
      //this.loading.dismiss();
      // get position
      geolocation.getCurrentPosition().then(pos => {
        // debugger;
      });
      // watch position
      const watch = geolocation.watchPosition().subscribe(pos => {
        console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
      });
      // to stop watching
      watch.unsubscribe();
    });
    //this.storage.set(this.config.UUID_Key, this.device.uuid);
  }
 
   // main URL
  LoadMainURL() {
    this.storage.get(this.config.MainURL_Key).then((res) => {
      AppSettings.API_ENDPOINT=res;
      this.ValidateUrl(res);

    })
      .catch(err => this.helper.showMessage(err, "error Message"));
  }

 //set employee data
  setEmployeeInfo(response: any) {
    this.empResponse = response.result as EmployeeModel;
    // debugger;
    this.storage.set(this.Config.EmployeeName_Key, this.empResponse.EMP_NAME);
    this.storage.set(this.Config.EmployeeDepartment_Key, this.empResponse.DEPT_NAME);
    this.storage.set(this.Config.EmployeeOrganization_Key, this.empResponse.ORG_NAME);
  }



  ValidateUrl(res: string) {
    //debugger;
    if (res == null || res == undefined || res == "") {
      this.helper.presentToast("Please set valid url for service ", 9000);
    }
    this.enableLogin = this.helper.checkURL(res)
  }

 //go to login page
  login() {
    this.navCtrl.navigateRoot('LoginPage');
  }
//go to signup page
  signup() {
    this.navCtrl.navigateRoot('SignupPage');
  }
//go to setting page
  settings() {
    this.navCtrl.navigateRoot('settings');
  }












  
  
  
  
  
  
  
  
  
  // showSkip = true;
  // slideOpts = {
  //   effect: 'flip',
  //   speed: 1000
  // };
  // dir: string = 'ltr';

  // slideList: Array<any> = [
  //   {
  //     title: 'What is ion<strong>Booking</strong>?',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp01.png',
  //   },
  //   {
  //     title: 'Why ionBooking?',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp02.png',
  //   },
  //   {
  //     title: 'Your Vacation is coming!',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
  //     image: 'assets/img/hotel-sp03.png',
  //   }
  // ];

  // constructor(
  //   public navCtrl: NavController,
  //   public menuCtrl: MenuController,
  //   public router: Router
  // ) {
  // }

  // ionViewWillEnter() {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
  }

  // onSlideNext() {
  //   this.slides.slideNext(1000, false);
  // }

	// onSlidePrev() {
  //   this.slides.slidePrev(300);
  // }

  // // onLastSlide() {
  // // 	this.slides.slideTo(3, 300)
  // // }

  // openHomePage() {
  //   this.navCtrl.navigateRoot('/home');
  //   // this.router.navigateByUrl('/tabs/(home:home)');
  // }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}
