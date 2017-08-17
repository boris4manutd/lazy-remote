import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Settings } from './settings';

@Injectable()
export class Api {
  private url: string;

  constructor(public http: Http,
              private settings: Settings) {
    console.info('api provider constructor');
    this.initUrl();
  }

  public setAddress(address: string, port: string) {
    if (address.indexOf('http://') !== 0 && address.indexOf('https://') !== 0)
      address = "http://" + address;
    this.url = address;
    if (port)
      this.url += ":" + port;
  }

  private initUrl(): void {

    this.settings
      .load()
      .then((data) => {

        if (!data || !data.apiAddress)
          return;

        let address = data.apiAddress;
        let port = data.apiPort;

        if (!address)
          return;

        if (address.indexOf('http://') !== 0 && address.indexOf('https://') !== 0)
          address = "http://" + address;

        this.url = address;

        if (port)
          this.url += ":" + port;
      });
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

  ping() {
    try {
      return this.http.get(this.url);
    } catch (e) {
      console.info('catch:');
      console.error(e);
    }

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