import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeoPunchingPage } from './geo-punching.page';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral } from '@agm/core';
import { Inject, Injectable } from '@angular/core';
import { PunchesService } from '../../../Services/PunchesService';
import { MapKeyModel } from '../../../models/MapKeyModel';
import {AppSettings} from '../../config/globals';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string;
  // apiPromise: Promise<string>;
  // GetKey(res: any): Promise<string> | string {
    
  
  
  //   //this.apiKey=res.result[0].mobile_gmap_api_key;
  //   //this.apiKey='AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y';
  //   //this.apiKey='AIzaSyBkcD1poGSDHoHf8HwQRbCCYI5KQAhBQno';
  //   //AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y
  //   return 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y';
  //   debugger;
  // }

  constructor(private punchser: PunchesService) {
    //this.apiKey = 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y';  
    // this.punchser.GetMapAPIKEY().subscribe((res)=>{     
    //   // this.GetKey(res);              
    //   this.apiPromise.then((res)=>{
    //     this.apiKey=res;
    //   });
    // })
    //this.apiKey = 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y';
    this.apiKey=AppSettings.MAPS_API;
    debugger;
    //this.punchser.GetMapAPIKEY().toPromise
  }
}


const routes: Routes = [
  {
    path: '',
    component: GeoPunchingPage
  }
];

@NgModule({
  providers: [
    Geolocation,
    Diagnostic,
    NativeGeocoder,
    { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig }
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot()
  ],
  declarations: [GeoPunchingPage]
})
export class GeoPunchingPageModule { }
// {
//   apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
// }