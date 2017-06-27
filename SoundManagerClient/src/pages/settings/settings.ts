import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private serverAddress: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    storage.get('serverAddress').then((val) => {
      if (val)
        this.serverAddress = val;
    });
  }

  public Confirm(): void {
    console.log(this.serverAddress);
    this.storage.set('serverAddress', this.serverAddress);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
}
