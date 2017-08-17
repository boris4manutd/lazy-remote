import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings, Api, InAppNotification } from "../../providers/providers";

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
  private form: FormGroup;
  private options: any;
  private settingsReady: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private settings: Settings,
              public formBuilder: FormBuilder,
              private api: Api,
              private inAppNotification: InAppNotification) {
  }

  public _buildForm(): void {
    this.form = this.formBuilder.group({
      apiAddress: [this.options.apiAddress, Validators.required],
      apiPort: [this.options.apiPort]
    });
  }

  public Connect(): void {
    let formData = this.form.value;

    this.api.setAddress(formData.apiAddress, formData.apiPort);

    try {
      this.api
        .get('')
        .subscribe(
          (val) => {
            let data = val.json();
            let currSettings = this.settings.allSettings;

            currSettings.hostOS = data.os;
            currSettings.apiAddress = formData.apiAddress;
            currSettings.apiPort = formData.apiPort;

            this.UpdateLocalSettings(currSettings);
          },
          (err)=> {
            // fail

            let defSettings = this.settings.defaultSettings;

            /*defSettings.apiAddress = formData.apiAddress;
             defSettings.apiPort = formData.apiPort;*/

            this.settings
              .merge(defSettings)
              .then((data)=> {
                this.inAppNotification.showToastNotification("Server can't be reached at provided address, please fill address and port(if needed) on Settings page.");
              });
          },
          ()=> {

          }
        );
    } catch (invalidURLException) {

    }
  }

  /**
   * Method that will update all settings required for application to work.
   *
   */
  private UpdateLocalSettings(data) {
    this.settings
      .merge(data)
      .then((data) => {
        // this will update values inside api provider
        this.inAppNotification.showToastNotification("Successfully connected to server.");
        
        this.api.setAddress(data.apiAddress, data.apiPort);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    /*this.page = this.navParams.get('page') || this.page;
     this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;*/

    /*this.translate.get(this.pageTitleKey).subscribe((res) => {
     this.pageTitle = res;
     })*/

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

}
