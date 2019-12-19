import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, ModalController, AlertController, Platform } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';
import { environment } from '../../../environments/environment';
import { Heplers } from '../../../providers/Helper/Helpers';
import { ModalTimTablePage, TimeTablePage } from '../time-table/time-table.page';
import { AppSettings } from '../../config/globals';
import { TimeTableListModel } from '../../../models/TimeTableListModel';
import { TimeTableService } from '../../../Services/TimeTableService';
import { DateComponent } from '../../../models/DateComponent';
import { UserService } from '../../../Services/UserService';
import { AccessRightsModel } from '../../../models/AccessRightsModel';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  openMenu: Boolean = false;
  searchQuery: String = '';
  items: string[];
  showItems: Boolean = false;
  rooms: any;
  adults: any;
  myDate: String;
  myTime: any;
  childs: any = 0;
  children: number;
  hotellocation: string;
  date: any;
  date2: any;
  timer: any;
  to_date: any;
  to_date1: any;
  from_date1: any;
  from_date: any;
  tt_date: any;
  emp_id: any;
  name1: any;
  name2: any;
  name3: any;

  agmStyles: any[] = environment.agmStyles;

  TTListModel: TimeTableListModel[];
  TTListModel1: any = [];
  TTListModel2: any = [];
  dateComp: DateComponent = { from: new Date().toISOString(), to: new Date().toISOString() };
  // search conditions
  public checkin = {
    name: this.translate.get('app.pages.home.label.checkin'),
    date: new Date().toISOString()
  };

  public checkout = {
    name: this.translate.get('app.pages.home.label.checkout'),
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  };
  tomorrow: Date;
  timetabletomorrow: any;
  statesIS: any;
  allowExcReq: any;
  allowGeoPunch: any;
  allowPunchReq: any
  allowVacReq: any;
  constructor(
    public storage: Storage,
    public usrSer: UserService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    public hotels: HotelProvider
    , public helper: Heplers,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public TTSerivce: TimeTableService,
    private platform: Platform
  ) {
    this.emp_id = JSON.parse(localStorage.getItem('empId'));
    this.name1 = localStorage.getItem('nameOne');
    this.name2 = localStorage.getItem('nameTwo');
    this.name3 = localStorage.getItem('nameThree');

    setTimeout(() => {

      this.LoadTimeTable();
      this.checkacess();

    }, 4000);



    
    this.tomorrow = new Date();
    console.log("today", this.tomorrow);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    console.log("tomorrow", this.tomorrow.toISOString());
    this.timetabletomorrow = this.tomorrow.toISOString().split('T')[0];

    // console.log("sssssss",AppSettings.STATE);
    this.statesIS = AppSettings.STATE;
    this.hotels = hotels.getAll();
    this.myDate = new Date().toISOString().split('T')[0];
    this.myTime = new Date().toISOString().split('T')[1].split('.')[0];
    // console.log(this.myDate,this.myTime);
    this.date = new Date();
    this.date2 = new Date(this.date.getTime() -
      this.date.getTimezoneOffset() * 60000).toISOString().split('T')[1].split('.')[0];
    //  console.log("aaaa",this.date2.split(":")[0]+':'+this.date2.split(":")[1]);

    this.timer = this.date2.split(":")[0] + ':' + this.date2.split(":")[1];

  }

  ngOnInit() {


   


  }


  async presentAlertRequests() {
var input=[];
    
    if(this.allowVacReq==-1 ){
input.push({
  name: 'Leave Request',
  type: 'radio',
  label: 'Leave Request',
  value: 'value1',
  handler: () => {
   
      alert("your not allowed to this action");
    
    alerts.dismiss();
  }
})
    }
    if (this.allowPunchReq == -1) {
      input.push({ 
        name: 'Manual Adjustment Request',
        type: 'radio',
        label: 'Manual Request',
        value: 'value2',
        handler: () => {
         
            this.navCtrl.navigateRoot('/manual-adjustment-request');
        
          alerts.dismiss();
        }
      })


    }

    if (this.allowExcReq == -1) {
      input.push({
        name: 'Execuse Request',
        type: 'radio',
        label: 'Execuse Request',
        value: 'value3',
        handler: () => {
      
            this.navCtrl.navigateRoot('/submit-execuse');
          
     
          alerts.dismiss();
        }
      })


    }

    if (this.allowGeoPunch == -1) {
      input.push({
        name: 'Geo Punching',
        type: 'radio',
        label: 'Geo Punching',
        value: 'value2',
        handler: () => {
        
            this.navCtrl.navigateRoot('/geo-punching');
          
    
          alerts.dismiss();
        }
      })


    }
    const alerts = await this.alertController.create({
      header: 'Requests',
      inputs:input,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alerts.present();
  }
  async presentAlertView() {
    const alert = await this.alertController.create({
      header: 'View',
      inputs: [
        {
          name: 'Attendance',
          type: 'radio',
          label: 'Attendance View',
          value: 'value1',
          handler: () => {
            this.navCtrl.navigateRoot('/attendance');
            alert.dismiss();
          }
        },



        {
          name: 'MyPunches',
          type: 'radio',
          label: 'MyPunches View',
          value: 'value3',
          handler: () => {
            this.navCtrl.navigateRoot('/MyPunches');
            alert.dismiss();
          }
        },
        {
          name: 'Leaves',
          type: 'radio',
          label: 'Leaves View',
          value: 'value3',
          handler: () => {
            this.navCtrl.navigateRoot('/Leaves');
            alert.dismiss();
          }
        },
        {
          name: 'Duties',
          type: 'radio',
          label: 'Duties View',
          value: 'value3',
          handler: () => {
            this.navCtrl.navigateRoot('/Duties');
            alert.dismiss();
          }
        },
        {
          name: 'timetable',
          type: 'radio',
          label: 'Timetable View',
          value: 'value2',
          handler: () => {
            this.navCtrl.navigateRoot('/TimeTable');
            alert.dismiss();
          }
        },
        {
          name: 'Execuses',
          type: 'radio',
          label: 'Execuses',
          value: 'value3',
          handler: () => {
            this.navCtrl.navigateRoot('/Execuses');
            alert.dismiss();
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  initializeItems() {
    this.items = [
      'La Belle Place - Rio de Janeiro',
      'Marshall Hotel - Marshall Islands',
      'Maksoud Plaza - São Paulo',
      'Hotel Copacabana - Rio de Janeiro',
      'Pousada Marés do amanhã - Maragogi'
    ];
  }

  itemSelected(item: string) {
    this.hotellocation = item;
    this.showItems = false;
  }

  childrenArr(chil) {
    const child = Number(chil);
    this.childs = Array(child).fill(0).map((v, i) => i);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.showItems = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.showItems = false;
    }
  }

  // togglePopupMenu() {
  //   return this.openMenu = !this.openMenu;
  // }
  // // //



  goToWalk() {
    this.navCtrl.navigateRoot('walkthrough');
  }

  logout() {
    this.storage.remove('checkLogin_router');  
    this.storage.remove('ConnPar'); 
    this.storage.remove('TestOne');  
    this.storage.remove('nameOne');  
    this.storage.remove('nameTwo');  
    this.storage.remove('nameThree');  
    this.storage.remove('empId');  
    this.storage.remove('ApiToken');  


    localStorage.removeItem('checkLogin_router');
    AppSettings.IsLogedIn = false;
    localStorage.removeItem('empId');
    localStorage.removeItem('ApiToken');
    localStorage.removeItem('nameOne');
    localStorage.removeItem('nameTwo');
    localStorage.removeItem('nameThree');
    this.navCtrl.navigateRoot('login');

  }




  MapTTListTable(res: any) {
    //debugger;


    this.TTListModel = res.result as TimeTableListModel[];

    this.to_date = this.TTListModel[0].TO_DATE_TIME;
    this.from_date = this.TTListModel[0].FROM_DATE_TIME;
    console.log(this.TTListModel[0]);
    console.log(this.TTListModel[1]);
    // console.log(this.TTListModel[1].TO_DATE_TIME);
    AppSettings.IsLogedIn = true;
    
    if (this.TTListModel[1]) {
      this.to_date1 = this.TTListModel[1].TO_DATE_TIME;
      this.from_date1 = this.TTListModel[1].FROM_DATE_TIME;
      this.tt_date = this.TTListModel[1].TT_DATE;
      this.TTListModel2 = this.TTListModel[1];
    }
    this.TTListModel1 = this.TTListModel[0];

    // console.log(this.TTListModel1);
    // console.log('TTListModel2==='+this.TTListModel2);
  }
  LoadTimeTable() {

    console.log(this.helper.ToDateString(
      this.dateComp.from));
    console.log(this.helper.ToDateString(this.timetabletomorrow));
    this.TTSerivce.GetTimeTableList(this.helper.ToDateString(
      this.dateComp.from),
      this.helper.ToDateString(this.timetabletomorrow)).subscribe(res =>
      // this.helper.ToDateString(this.dateComp.to)).subscribe(res =>
      {
        console.log(res);
        this.MapTTListTable(res);

      });
  }

  checkacess() {
    this.TTSerivce.GetRightAccessis().subscribe((res: any) => {
      AppSettings.permissions = res.result as AccessRightsModel
      console.log(res.result);

      this.allowExcReq = res.result.AllowExcReq;
      this.allowGeoPunch = res.result.AllowGeoPunch
      this.allowPunchReq = res.result.AllowPunchReq
      this.allowVacReq = res.result.AllowVacReq
      console.log("GetRightAccess-----------------");
      console.log(this.allowExcReq);
      console.log(this.allowGeoPunch);
      console.log(this.allowPunchReq);
      console.log(this.allowVacReq);
    });
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

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}



@Component({
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
     
    </ion-title>

    <ion-button full (click)="dismiss()" icon-left size="medium" expand="full" shape="round" color="danger" tappable>
    <ion-ripple-effect></ion-ripple-effect>
    <ion-icon name="close"></ion-icon>
    Close
  </ion-button>

  </ion-toolbar>
</ion-header>
<ion-content>

<ion-grid>
<ion-row>
  <ion-col>
    
    <ion-list>
      <ion-item-sliding>
        <ion-item tappable>
        <ion-button expand="full"  color="danger">Punch Out</ion-button>
        </ion-item>
      </ion-item-sliding>
      <ion-item-sliding>
      <ion-item tappable>
      <ion-button expand="full"  color="danger">Punch Out</ion-button>
      </ion-item>
    </ion-item-sliding>
    <ion-item-sliding>
    <ion-item tappable>
    <ion-button expand="full"  color="danger">Punch Out</ion-button>
    </ion-item>
  </ion-item-sliding>
  <ion-item-sliding>
  <ion-item tappable>
  <ion-button expand="full"  color="danger">Punch Out</ion-button>
  </ion-item>
</ion-item-sliding>
    </ion-list>
  </ion-col>
</ion-row>
</ion-grid>
<ion-card>
</ion-card>
</ion-content>
  `})
export class ButtomhomePage {

  constructor(
    // public platform: Platform,
    public helper: Heplers,
    private modalCtrl: ModalController,
  ) {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
