/**
 * Created by dev on 29.03.17.
 */

import { Injectable } from '@angular/core';

@Injectable()
export declare class LazyLoaderService {
  private _cache: any;

  load(url: string): Promise<any>;
}
