import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { NativeHttpError } from '@app/core/classes';
import '@capacitor-community/http';
import { HttpResponse } from '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

export enum NativeHttpMethod {
  GET = 'get',
  POST = 'post',
}

export interface INativeHttpRequestOptions {
  method: NativeHttpMethod;
  url: string;
  headers?: { [name: string]: string };
  params?: { [name: string]: string };
  data?: any;
}

const LOGTAG = '[NativeHttpService]';

@Injectable({
  providedIn: 'root',
})
export class NativeHttpService {
  constructor() {}

  public async request(options: INativeHttpRequestOptions): Promise<HttpResponse> {
    try {
      return await this.sendRequest(options);
    } catch (error) {
      console.error(LOGTAG, { options, error });
      throw this.parseError(error);
    }
  }

  private sendRequest(options: INativeHttpRequestOptions): Promise<HttpResponse> {
    return Plugins.Http.request({
      url: options.url,
      connectTimeout: Config.httpTimeout,
      data: options.data,
      headers: options.headers,
      method: options.method,
    });
  }

  private parseError(error: any): Error {
    if (error instanceof Object && 'rejection' in error) {
      error = (error as any).rejection;
    }
    if (!error.error || !error.status || !error.url) {
      return new Error(`${LOGTAG} Unknown error occurred.`);
    }
    // TODO
    return new NativeHttpError(`Ein unbekannter Fehler ist aufgetreten.`);
    // switch (error.status) {
    //   case this.nativeHttp.ErrorCode.TIMEOUT:
    //     return new NativeHttpError(
    //       [
    //         'Es kam zu einer Zeitüberschreitung.',
    //         'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
    //       ].join(' '),
    //     );
    //   case this.nativeHttp.ErrorCode.NOT_CONNECTED:
    //     return new NativeHttpError(
    //       [
    //         'Es konnte keine Verbindung hergestellt werden.',
    //         'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
    //       ].join(' '),
    //     );
    //   default:
    //     return new NativeHttpError(`Ein unbekannter Fehler ist aufgetreten.`);
    // }
  }
}
