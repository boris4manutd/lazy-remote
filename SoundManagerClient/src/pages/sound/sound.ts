import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Common } from '../../classes/Common';

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
export class SoundPage extends Common {

  private isVolumeDownPressed: boolean;
  private isVolumeUpPressed: boolean;
  private isVolumeMutePressed: boolean;
  private isVolumeUnmutePressed: boolean;

  constructor(public _navCtrl: NavController, public _navParams: NavParams, private _storage: Storage, private _http: Http) {
    super(_navCtrl, _storage, _http);

    this.isVolumeDownPressed = this.isVolumeUpPressed = this.isVolumeMutePressed = this.isVolumeUnmutePressed = false;
  }

  public VolumeUp(): void {
    this.isVolumeUpPressed = true;
    let activateButton = () => {
      this.isVolumeUpPressed = false;
    };

    this.PerformPostRequest("volume", "up",[], activateButton, activateButton);
  }

  public VolumeDown(): void {
    this.isVolumeDownPressed = true;
    let activateButton = () => {
      this.isVolumeDownPressed = false;
    };

    this.PerformPostRequest("volume", "down",[], activateButton, activateButton);
  }

  public VolumeMute(): void {
    this.isVolumeMutePressed = true;
    let activateButton = () => {
      this.isVolumeMutePressed = false;
    };

    this.PerformPostRequest("volume", "mute",[], activateButton, activateButton);
  }

  public VolumeUnmute(): void {
    this.isVolumeUnmutePressed = true;
    let activateButton = () => {
      this.isVolumeUnmutePressed = false;
    };

    this.PerformPostRequest("volume", "unmute",[], activateButton, activateButton);
  }

  ionViewDidLoad() {

  }

}
