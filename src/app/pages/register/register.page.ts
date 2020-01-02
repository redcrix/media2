import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../../Services/UserService';
import { RegisterUserModel } from '../../../models/RegisterUserModel';
import { Heplers } from '../../../providers/Helper/Helpers';
import { NavController } from '@ionic/angular';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  usr: RegisterUserModel = { emp_id: "", emp_pwd: "", uuid: "" }
  response: any;
  passwordConfirm: string = "";
  deviceId: string;
  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public helper: Heplers,
    private uniqueDeviceID: UniqueDeviceID,
  ) {


  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  signUp() {
    
    console.log(this.passwordConfirm, this.usr.emp_pwd)
    if (this.passwordConfirm == this.usr.emp_pwd) {
      

  // '4cc506b3-2a33-4f6a-98de-700f36438594'

  // this.uniqueDeviceID.get()
  // .then(data => {
    this.userService.RegisterUser('4cc506b3-2a33-4f6a-98de-700f36438599', this.usr.emp_id, this.usr.emp_pwd).subscribe((res: any) => {
      this.response = res;
      if (this.response.code == 0) {
        this.helper.showMessage(res.result , '');
        this.navCtrl.navigateRoot('login',false, {replaceUrl: true});
      }
      else {
        this.helper.showMessage(res.result , '');
        // this.navCtrl.navigateRoot('login',false, {replaceUrl: true});
      }
    });
  // });

 
  }
    else {
      this.helper.showMessage("Passwords not matched", "Error");
    }
  }
  Back(){
    this.navCtrl.navigateRoot('/login');
  }


  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  goToSettings(){
    this.navCtrl.navigateRoot('/settings');
  }

}
