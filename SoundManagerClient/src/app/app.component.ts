import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SystemPage, SoundPage, SettingsPage } from '../pages/pages';
import { Settings, Api } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _settings: Settings, private _api: Api) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sound', component: SoundPage },
      { title: 'System', component: SystemPage },
      { title: 'Settings', component: SettingsPage }
    ];

    this.setRootPage();
  }

  /**
   * This method will set rootPage of application, this will be done by checking settings for apiAddress and apiPort.
   * If they exists, connection attempt occurs, on successfully connecting hostOS is updated and SountPage will be
   * loaded, otherwise SettingsPage is loaded.
   *
   */
  private setRootPage() {
    this._settings
      .getValue('apiAddress')
      .then((apiAddress: string) => {
        if (!apiAddress) {
          this.rootPage = SettingsPage;
          return;
        }
        this._settings
          .getValue('apiPort')
          .then((apiPort: string) => {
            this._api.setAddress(apiAddress, apiPort);

            this._api
              .get('')
              .subscribe(
                (data)=> {
                  // succ
                  let response = data.json();
                  this.rootPage = SoundPage;
                  this._settings.setValue('hostOS', response.os);
                },
                (err)=> {
                  // fail
                  this.rootPage = SettingsPage;
                },
                ()=> {

                }
              );
          });

      }, (error) => {
        this.rootPage = SettingsPage;
      });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /*console.info('ready!');
       this.rootPage = SettingsPage;*/
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
