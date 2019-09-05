import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
//import { Geolocation } from '@ionic-native/geolocation';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { MomentPipe } from '../../src/app/moment.pipe';
import { TranslateProvider, HotelProvider } from './providers';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { LocationPageModule } from './pages/modal/location/location.module';



import { AttendanceService } from '../Services/AttendanceService'
import { PunchesService } from '../Services/PunchesService';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LeavesService } from '../Services/LeavesService';
import { TimeTableService } from '../Services/TimeTableService';
import { ExecuseService } from '../Services/ExecuseService';
import { RequestService } from '../Services/RequestService';
import { HelperService } from '../Services/HelperService';
import { UserService } from '../Services/UserService';
import { Settings, User, Api } from '../providers';
import { Heplers } from '../providers/Helper/Helpers';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { config } from '../providers/Config';
import { ModalContentPage } from './pages/leaves/leaves.page';
import { ModalTimTablePage } from './pages/time-table/time-table.page';
import { ButtomhomePage } from './pages/home/home.page';
//import { Device } from '@ionic-native/device';
//import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Toast } from '@ionic-native/toast/ngx';
import { PopmenuComponent } from './components/popmenu/popmenu.component';
import { MomentPipe } from './moment.pipe';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,ModalContentPage,
    ModalTimTablePage,ButtomhomePage,PopmenuComponent, MomentPipe
  ],
  imports: [
    BrowserModule,      
    BrowserAnimationsModule,
    IonicModule.forRoot(environment.config),
    AppRoutingModule,
    HttpModule,
   
    HttpClientModule,
    ImagePageModule,
    LocationPageModule,
    IonicStorageModule.forRoot({
      name: '__com.ionicframework.ivision.v2',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  
  entryComponents: [
  
    ModalContentPage,
    ModalTimTablePage,
    ButtomhomePage
   
  ],
  providers: [
    Device,
    StatusBar,
    QRScanner,
    DatePicker,
    AttendanceService,
    PunchesService,
    LeavesService,
    Toast,
    PopmenuComponent,
    //Geolocation,
    //AndroidPermissions,
    Api,
    User,
    Heplers,
    //Device,
    DecimalPipe,
    DatePipe,
    config,
    TimeTableService,
    ExecuseService,
    RequestService,
    HelperService,
    UserService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    HotelProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
