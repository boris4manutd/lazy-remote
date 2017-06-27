import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/Rx';
import { SettingsPage } from '../pages/settings/settings';

@Injectable()
export class Common {
  private deviceInfo = {
    imei: null,
    platform: null
  };

  private remoteServerInfo = {
    serverAddress: null,
    serverPort: null,
    fullServerAddress: null
  };

  public constructor(private navCtrl: NavController, private storage: Storage, private http: Http) {
    this.SetServerInfo();
    this.SetDeviceInfo();
  }

  private SetServerInfo(): void {
    this.remoteServerInfo.serverPort = "8000";
    this.storage.get('serverAddress').then((val) => {
      if (!val) {
        this.navCtrl.setRoot(SettingsPage);
        return;
      }

      this.remoteServerInfo.serverAddress = val;
      if (val.indexOf("http://") != 0) {
        this.remoteServerInfo.serverAddress = "http://" + val;
      }

      this.remoteServerInfo.fullServerAddress = this.remoteServerInfo.serverAddress + ":" + this.remoteServerInfo.serverPort + "/";
    });
  }

  private SetDeviceInfo(): void {
    this.deviceInfo = null;
  }

  public PerformPostRequest(controllerName: string, pageName: string, data: any[], succFunc: () => void, failFunc: () => void) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let address = this.remoteServerInfo.fullServerAddress + controllerName + "/" + pageName;

    this.http
      .post(address, data, {
        headers: headers
      })
      .subscribe(data => {
        succFunc();
      }, error => {
        console.error(JSON.stringify(error));
        failFunc();
      });
  }
}
