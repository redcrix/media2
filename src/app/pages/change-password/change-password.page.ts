import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Heplers } from '../../../providers/Helper/Helpers';
import { UserService } from '../../../Services/UserService';
import { AppSettings } from '../../../app/config/globals';
import { Storage } from '@ionic/storage';
import { config } from '../../../providers/Config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
  empID : string;

  constructor(    public Myconfig: config,public storage: Storage,public usrService: UserService, public helper: Heplers, public navCtrl: NavController) {
  }

  ChangePassword() {
    if (this.ConfirmPassword != this.NewPassword) {
      this.helper.showMessage("Passwords dose not matched", "Error")
    }
    else {
      this.usrService.ChangePassword(this.OldPassword, this.NewPassword, this.empID).subscribe((res: any) => {

        console.log(JSON.stringify(res));
        if (res.code == 0) {
          this.helper.showMessage("Password has been changed successfully, Please login with new.", "Done");

          this.logOut();
        }
        else {
          this.helper.ShowErrorMessage(res.code);
        }
      });
    }

  }


  logOut() {
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


  ngOnInit() {
  }

  Back(){
    this.navCtrl.navigateRoot('/login');
  }


}
