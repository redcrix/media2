import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from '../../../Services/HelperService';
import { config } from '../../../providers/Config';
import { Storage } from '@ionic/storage';
import { Heplers } from '../../../providers/Helper/Helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from '../../config/globals';
import { LoadingController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  loading: HTMLIonLoadingElement;
  options: any;
  MainURL: string;
  settingItem: { mainurl: string } = {
    mainurl: ''
  };

  settingsReady = false;
  form: FormGroup;
  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(private qrScanner: QRScanner,
              public loadingController: LoadingController, 
              public navCtrl: NavController, 
              public helperService: HelperService,
              public helper: Heplers, 
              public Config: config,
               public storage: Storage) {

    this.storage.get(this.Config.MainURL_Key).then(res => this.settingItem.mainurl = res);

  }

  ngOnInit() {
  }

  scanQRCode() {
    try
    {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            //console.log('Scanned something', text);
            this.helper.showMessage(text,"from scanner");
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) =>  this.helper.showMessage(e,"Error"));
    }
    catch(Error)
    {
      this.helper.showMessage(Error.message,"Error")
    }
  }
  
  ionViewDidLoad() {
    // Build an empty form for the template to render
    //this.form = this.formBuilder.group({});
  }

  async DismissLoadingSpinner() {
    return await this.loadingController.dismiss();
  }

  //check url
  CheckURL(res: any) {
    console.log(res);
    if (res.code == 0 || res.code == 8) {
      this.helper.presentToast("Saving changes .....", 2000);
      AppSettings.API_ENDPOINT = this.settingItem.mainurl;
      this.storage.set(this.Config.MainURL_Key, this.settingItem.mainurl);
      //this.navCtrl.navigateRoot('login');
      setTimeout(() => {
        this.navCtrl.navigateRoot('login');
      }, 2000);
    }
    else {
      this.helper.showMessage("Invalid URL","");
    }
  }

//show error 
  showErr() {
  this.helper.showMessage("Invalid URL", "");
  }

  //savaing
  saveSettings() {

    console.log('debug'+this.settingItem.mainurl);
    this.helperService.CheckTimeFormat(this.settingItem.mainurl)
    .subscribe(res => {
      console.log(res);
      this.CheckURL(res);
    
    }
     

    , err => {
      console.log(err);
      this.showErr();
      
    }
    );
    //debugger;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait....', duration: 900000
    });
    return await this.loading.present();
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

  Back(){

    this.navCtrl.navigateRoot('/login');
  }
  
}
