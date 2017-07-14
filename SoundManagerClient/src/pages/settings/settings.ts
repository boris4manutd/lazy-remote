import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Settings, Api } from "../../providers/providers";

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
              private api: Api) {
  }

  public _buildForm(): void {
    let group: any = {
      apiAddress: [this.options.apiAddress],
      apiPort: [this.options.apiPort]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings
        .merge(this.form.value)
        .then((data) => {

          // this will update values inside api provider
          this.api.setAddress(data.apiAddress, data.apiPort);
        });

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
