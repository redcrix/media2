import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPage } from './login.page';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  providers: [
    UniqueDeviceID,
    Device
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
