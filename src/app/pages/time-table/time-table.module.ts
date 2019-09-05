import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IonicModule } from '@ionic/angular';

import { TimeTablePage } from './time-table.page';

const routes: Routes = [
  {
    path: '',
    component: TimeTablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DatePicker
  ],
  declarations: [TimeTablePage]
})
export class TimeTablePageModule {}
