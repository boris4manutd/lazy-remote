import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Api } from '../../providers/providers';


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
export class SystemPage {

  private systemOptions: any[];

  constructor(private _navCtrl: NavController, private navParams: NavParams, private _storage: Storage, private _http: Http, private api: Api) {
    this.systemOptions = [
      {
        name: "Shut Down",
        method: this.ShutDown,
        isActive: false
      },
      {
        name: "Reset",
        method: this.Reset,
        isActive: false
      },
      {
        name: "Sleep",
        method: this.Sleep,
        isActive: false
      },
      {
        name: "Log off",
        method: this.LogOff,
        isActive: false
      },
      {
        name: "Lock",
        method: this.Lock,
        isActive: false
      }
    ];
  }

  public ShutDown(): void {
    if (this.systemOptions[0].isActive)
      return;

    this.systemOptions[0].isActive = true;

    let activateButton = (): void => {
      this.systemOptions[0].isActive = false;
    };
    this.PerformRequest("system/shutdown", {}, activateButton);
  }

  public Reset(): void {
    if (this.systemOptions[1].isActive)
      return;

    this.systemOptions[1].isActive = true;


    let activateButton = (): void => {
      this.systemOptions[1].isActive = false;
    };

    this.PerformRequest("system/reset", {}, activateButton);
  }

  public Sleep(): void {
    if (this.systemOptions[2].isActive)
      return;

    this.systemOptions[2].isActive = true;


    let activateButton = (): void => {
      this.systemOptions[2].isActive = false;
    };

    this.PerformRequest("system/sleep", {}, activateButton);
  }

  public  LogOff(): void {
    if (this.systemOptions[3].isActive)
      return;

    this.systemOptions[3].isActive = true;


    let activateButton = (): void => {
      this.systemOptions[3].isActive = false;
    };
    this.PerformRequest("system/logoff", {}, activateButton);
  }

  public Lock(): void {
    if (this.systemOptions[4].isActive)
      return;

    this.systemOptions[4].isActive = true;

    let activateButton = (): void => {
      this.systemOptions[4].isActive = false;
    };
    this.PerformRequest("system/lock", {}, activateButton);
  }

  private PerformRequest(endpoint: string, data: any, activateButtonFunc?: ()=>void) {
    this.api
      .post(endpoint, data)
      .subscribe(
        (data)=> {
          // succ
          if (activateButtonFunc)
            activateButtonFunc();
        },
        (err)=> {
          // fail
          if (activateButtonFunc)
            activateButtonFunc();
        },
        ()=> {

        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SystemPage');
  }

}
