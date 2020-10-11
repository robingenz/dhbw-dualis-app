import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import '@capacitor-community/http';
import { HttpOptions, HttpResponse } from '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
}

@Injectable({
  providedIn: 'root',
})
export class NativeHttpService {
  constructor() {}

  public request(options: HttpOptions): Promise<HttpResponse> {
    if (!options.connectTimeout) {
      options.connectTimeout = Config.httpTimeout;
    }
    return Plugins.Http.request(options);
  }
}
