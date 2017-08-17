import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx';

import { Api, Settings, InAppNotification } from "../../providers/providers";
import { CommonPageClass } from '../../util/commonpageclass';

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
export class SoundPage extends CommonPageClass {

  private isVolumeDownPressed: boolean;
  private isVolumeUpPressed: boolean;
  private isVolumeMutePressed: boolean;
  private isVolumeUnmutePressed: boolean;

  private isMuted: boolean;

  private hostOS: string;

  private balance: number;

  constructor(navCtrl: NavController, navParams: NavParams, storage: Storage, http: Http, api: Api, settings: Settings, inAppNotification: InAppNotification) {
    super(navCtrl, navParams, storage, http, api, settings, inAppNotification);

    this.isVolumeDownPressed = this.isVolumeUpPressed = this.isVolumeMutePressed = this.isVolumeUnmutePressed = false;

    this.settings
      .getValue('hostOS')
      .then((val) => {
        this.hostOS = val;
      });
  }

  /**
   * Volume increasing method.
   *
   * @constructor
   */
  public VolumeUp(): void {
    this.isVolumeUpPressed = true;
    let activateButton = () => {
      this.isVolumeUpPressed = false;
    };

    this.PerformRequestToServer("volume/up", "balance=" + this.balance, activateButton, activateButton);
  }

  /**
   * Volume decreasing method.
   *
   * @constructor
   */
  public VolumeDown(): void {
    this.isVolumeDownPressed = true;
    let activateButton = () => {
      this.isVolumeDownPressed = false;
    };

    this.PerformRequestToServer("volume/down", "balance=" + this.balance, activateButton);
  }

  /**
   * Volume mute method.
   *
   * @constructor
   */
  public VolumeMute(): void {
    this.isVolumeMutePressed = true;
    let activateButton = () => {
      this.isVolumeMutePressed = false;
    };

    this.PerformRequestToServer("volume/mute", {}, activateButton, () => {
      this.ToggleMute();
    });
  }

  /**
   * Volume un-mute method.
   *
   * @constructor
   */
  public VolumeUnmute(): void {
    this.isVolumeUnmutePressed = true;
    let activateButton = () => {
      this.isVolumeUnmutePressed = false;
    };

    this.PerformRequestToServer("volume/unmute", {}, activateButton, () => {
      this.ToggleMute();
    });
  }

  /**
   * Event for balance change.
   *
   * @param $event
   * @constructor
   */
  public BalanceChanged($event): void {
    this.PerformRequestToServer("volume/balance", "balance=" + this.balance);
  }

  /**
   * Toggle mute state (UI related function).
   *
   * @constructor
   */
  private ToggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  /**
   * Method that will be called to obtain sound data from server (currently, valid only for Linux hosts).
   *
   * @constructor
   */
  private GetVolumeInfoFromServer(): void {
    this.api
      .get('volume')
      .subscribe((response)=> {
        let data = response.json();

        this.isMuted = data.isMuted;
        this.balance = parseInt(data.balance);
      });
  }

  ionViewDidLoad() {
    this.RedirectIfSettingsNotSet(() => {
      this.GetVolumeInfoFromServer();
    });
  }
}
