import { Http } from "@angular/http";
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Api, Settings, InAppNotification } from "../providers/providers";
import { SettingsPage } from '../pages/settings/settings';

/**
 * Class that has common logic for pages.
 *
 */
export class CommonPageClass {
  private _serverUnavailable: boolean = false;

  public constructor(private _navCtrl: NavController, private _navParams: NavParams, private _storage: Storage, private _http: Http, private _api: Api, private _settings: Settings, private inAppNotification: InAppNotification) {

  }

  /**
   * Method for redirecting if hostOS is missing in settings.
   *
   * @param successFunction
   * @constructor
   */
  public RedirectIfSettingsNotSet(successFunction?: ()=>void): void {

    let currSettings = this._settings.allSettings;

    if (!currSettings.hostOS) {
      this._navCtrl.setRoot(SettingsPage);
    } else {
      successFunction ? successFunction() : false;
    }
  }

  /**
   * Method that will communicate with server.
   *
   * @param endpoint
   * @param data
   * @param activateButton
   * @param successFunc
   * @param failFunc
   * @constructor
   */
  public PerformRequestToServer(endpoint: string, data: any, activateButton?: ()=>void, successFunc?: ()=>void, failFunc?: () => void) {

    if (this._serverUnavailable) {
      activateButton ? activateButton() : false;
      return;
    }

    this._api
      .post(endpoint, data)
      .subscribe(
        (data)=> {
          // succ
          activateButton ? activateButton() : false;
          successFunc ? successFunc() : false;
        },
        (err)=> {
          // fail
          this._serverUnavailable = true;
          activateButton ? activateButton() : false;
          failFunc ? failFunc() : false;
          this.inAppNotification.showToastNotification("Server can't be reached at provided address, please fill address and port(if needed) on Settings page.");
        },
        ()=> {

        }
      );
  }

  // getters and setters:
  public get navCtrl(): NavController {
    return this._navCtrl;
  }

  public set navCtrl(navCtrl: NavController) {
    this._navCtrl = navCtrl;
  }

  public get navParams(): NavParams {
    return this._navParams;
  }

  public set navParams(navParams: NavParams) {
    this._navParams = navParams;
  }

  public get storage(): Storage {
    return this._storage;
  }

  public set storage(value: Storage) {
    this._storage = value;
  }

  public get http(): Http {
    return this._http;
  }

  public set http(value: Http) {
    this._http = value;
  }

  public get api(): Api {
    return this._api;
  }

  public set api(value: Api) {
    this._api = value;
  }

  public get settings(): Settings {
    return this._settings;
  }

  public set settings(settings: Settings) {
    this._settings = settings;
  }

  public get serverUnavailable(): boolean {
    return this._serverUnavailable;
  }

  public set serverUnavailable(value: boolean) {
    this._serverUnavailable = value;
  }
}