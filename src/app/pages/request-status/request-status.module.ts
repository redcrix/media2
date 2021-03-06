import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RequestStatusPage } from './request-status.page';
import { SafeHtmlPipe } from './../../safe-html.pipe';

const routes: Routes = [
  {
    path: '',
    component: RequestStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],exports:[SafeHtmlPipe],

  declarations: [RequestStatusPage,SafeHtmlPipe]
})
export class RequestStatusPageModule {}
