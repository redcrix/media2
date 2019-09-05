import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SubmitExecusePage } from './submit-execuse.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitExecusePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubmitExecusePage]
})
export class SubmitExecusePageModule {}
