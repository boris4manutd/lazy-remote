import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx';

import { Api, Settings } from "../../providers/providers";

/**
 * Generated class for the SoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
})
export class SoundPage {

  private isVolumeDownPressed: boolean;
  private isVolumeUpPressed: boolean;
  private isVolumeMutePressed: boolean;
  private isVolumeUnmutePressed: boolean;

  private balance: number;

  private serverNotSet: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private api: Api, public toastCtrl: ToastController) {

    this.isVolumeDownPressed = this.isVolumeUpPressed = this.isVolumeMutePressed = this.isVolumeUnmutePressed = false;
  }

  public VolumeUp(): void {
    this.isVolumeUpPressed = true;
    let activateButton = () => {
      this.isVolumeUpPressed = false;
    };

    this.PerformRequest("volume/up", {}, activateButton);
  }

  public VolumeDown(): void {
    this.isVolumeDownPressed = true;
    let activateButton = () => {
      this.isVolumeDownPressed = false;
    };

    this.PerformRequest("volume/down", {}, activateButton);
  }

  public VolumeMute(): void {
    this.isVolumeMutePressed = true;
    let activateButton = () => {
      this.isVolumeMutePressed = false;
    };

    this.PerformRequest("volume/mute", {}, activateButton);
  }

  public VolumeUnmute(): void {
    this.isVolumeUnmutePressed = true;
    let activateButton = () => {
      this.isVolumeUnmutePressed = false;
    };

    this.PerformRequest("volume/unmute", {}, activateButton);
  }

  public BalanceChanged($event): void {

    var a = function () {
    };

    this.PerformRequest("volume/balance", "balance=" + this.balance);

    //*/ { "balance": this.balance }
    //this.PerformPostRequest("volume", "balance", "balance=" + this.balance, a, a);
  }

  private PerformRequest(endpoint: string, data: any, activateButtonFunc?: ()=>void) {

    if(this.serverNotSet) {
      if (activateButtonFunc)
        activateButtonFunc();
      return;
    }
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

          this.serverNotSet = true;

          let toast = this.toastCtrl.create({
            message: "Server can't be reached at provided address, please fill address and port(if needed) on Settings page.",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        },
        ()=> {

        }
      );
  }


  ionViewDidLoad() {
    console.log('sound - ionViewDidLoad');
  }

}
