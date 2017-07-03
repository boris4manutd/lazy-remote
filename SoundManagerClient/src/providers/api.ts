import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Settings } from './settings';

@Injectable()
export class Api {
  private url: string;

  constructor(public http: Http,
              private settings: Settings) {
    this.initUrl();
  }

  private initUrl(): void {
    try {
      console.log('adawdw');
      this.settings.getValue('apiAddress')
        .then((address) => {
          if (address.indexOf('http://') !== 0 && address.indexOf('https://') !== 0)
            address = "http://" + address;

          this.url = address;
          this.settings.getValue('apiPort')
            .then((port) => {
              this.url += ":" + port;
            });
        });
    }
    catch (e) {

    }
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {

    if (!options)
      options = new RequestOptions();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    options.headers = headers;
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

}