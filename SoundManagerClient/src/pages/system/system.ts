import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Api, Settings, InAppNotification } from '../../providers/providers';
import { CommonPageClass } from '../../util/commonpageclass';

/**
 * Generated class for the SystemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-system',
  templateUrl: 'system.html',
})
export class SystemPage extends CommonPageClass {

  private systemOptions: any[];
  private isLinux: boolean = false;

  constructor(navCtrl: NavController, navParams: NavParams, storage: Storage, http: Http, api: Api, settings: Settings, inAppNotification: InAppNotification) {
    super(navCtrl, navParams, storage, http, api, settings, inAppNotification);

    // inside "method" functions, this isn't in object's scope, but instead in scope of his namespace {name, method, isActive}
    let _me = this;
    this.systemOptions = [
      {
        name: "Shut Down",
        method: (__me: SystemPage = _me) => { // send _me to function so propper method could ne called
          __me.executeSystemOperation("shutdown", 0);
        },
        isActive: false
      },
      {
        name: "Reset",
        method: (__me: SystemPage = _me) => {
          __me.executeSystemOperation("reset", 1);
        },
        isActive: false
      },
      {
        name: "Sleep",
        method: (__me: SystemPage = _me) => {
          __me.executeSystemOperation("sleep", 2);
        },
        isActive: false
      },
      {
        name: "Log off",
        method: (__me: SystemPage = _me) => {

          __me.executeSystemOperation("logoff", 3);
        },
        isActive: false
      },
      {
        name: "Lock",
        method: (__me: SystemPage = _me) => {
          __me.executeSystemOperation("lock", 4);
        },
        isActive: false
      }
    ];

    this
      .settings
      .getValue('hostOS')
      .then((value) => {
        if (value == "Linux") {
          _me.systemOptions.splice(3, 1);
          _me.isLinux = true;
        }
      });
  }

  /**
   * Method for executing requested system operation.
   *
   * @param operationName name of operation
   * @param index index of selected operation
   */
  private executeSystemOperation(operationName: string, index: number) {
    if (operationName == "lock" && this.isLinux) {
      index = 3;
    }

    if (this.systemOptions[index].isActive)
      return;

    this.systemOptions[index].isActive = true;

    let activateButton = (): void => {
      this.systemOptions[index].isActive = false;
    };
    this.PerformRequestToServer("system/" + operationName, {}, activateButton);
  }

  ionViewDidLoad() {
    super.RedirectIfSettingsNotSet();
  }

}
