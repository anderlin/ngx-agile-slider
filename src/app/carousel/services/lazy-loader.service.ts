/**
 * Created by dev on 29.03.17.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * This service represents a worker for image loading.
 */
@Injectable()
export class LazyLoaderService {

  /**
   * Cache for loaded images
   * @type {{}}
   * @private
   */
  private _cache: any = {};

  /**
   * Constructor
   * @param http Angular Http service
   */
  constructor(private http: Http) {}

  /**
   * Loads the image and cached them.
   * @param url image to load from
   * @returns {any} return true if ready
   */
  public load(url: string): Promise<any> {
    if (this._cache[url]) {
      return Promise.resolve(true);
    } else {
      return new Promise((resolve, reject) => {
        this.http.get(url)
          .subscribe(res => {
            this._cache[url] = true;
            resolve(true);
          });
      });
    }
  }
}
