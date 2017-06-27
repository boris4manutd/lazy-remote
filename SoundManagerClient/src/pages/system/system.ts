import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Common } from '../../classes/Common';

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
export class SystemPage extends Common {

  private systemOptions: any[];

  constructor(private _navCtrl: NavController, private navParams: NavParams, private _storage: Storage, private _http: Http) {
    super(_navCtrl, _storage, _http);


    this.systemOptions = [
      {
        name: "Shut Down",
        method: this.ShutDown
      },
      {
        name: "Reset",
        method: this.Reset
      },
      {
        name: "Sleep",
        method: this.Sleep
      },
      {
        name: "Log off",
        method: this.LogOff
      },
      {
        name: "Lock",
        method: this.Lock
      }
    ];
  }

  public ShutDown(): void {
    let activateButton = (): void => {

    };

    this.PerformPostRequest("system", "shutdown", [], activateButton, activateButton);
  }

  public Lock(): void {
    let activateButton = (): void => {

    };
    this.PerformPostRequest("system", "lock", [], activateButton, activateButton);

  }

  public  LogOff(): void {
    let activateButton = (): void => {

    };
    this.PerformPostRequest("system", "logoff", [], activateButton, activateButton);

  }

  public Sleep(): void {
    let activateButton = (): void => {

    };
    this.PerformPostRequest("system", "sleep", [], activateButton, activateButton);

  }

  public Reset(): void {
    let activateButton = (): void => {

    };
    this.PerformPostRequest("system", "reset", [], activateButton, activateButton);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SystemPage');
  }

}
