import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { SystemPage, SoundPage, SettingsPage } from '../pages/pages';

import { Common } from '../classes/Common';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SystemPage,
    SoundPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SystemPage,
    SoundPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Common,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
