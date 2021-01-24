import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { NativeHttpError } from '@app/core/classes';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

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
  constructor(private nativeHttp: HTTP) {
    nativeHttp.setRequestTimeout(Config.httpTimeout);
  }

  public async request(options: INativeHttpRequestOptions): Promise<HTTPResponse> {
    try {
      return await this.sendRequest(options);
    } catch (error) {
      console.error(LOGTAG, { options, error });
      throw this.parseError(error);
    }
  }

  private sendRequest(options: INativeHttpRequestOptions): Promise<HTTPResponse> {
    switch (options.method) {
      case NativeHttpMethod.GET:
        return this.nativeHttp.sendRequest(options.url, {
          method: NativeHttpMethod.GET,
          headers: options.headers,
          params: options.params,
        });
      case NativeHttpMethod.POST:
        return this.nativeHttp.sendRequest(options.url, {
          method: NativeHttpMethod.POST,
          headers: options.headers,
          data: options.data,
          serializer: 'multipart',
        });
      default:
        throw new Error(`${LOGTAG} Http method '${options.method}' not supported.`);
    }
  }

  private parseError(error: any): Error {
    if (error instanceof Object && 'rejection' in error) {
      error = (error as any).rejection;
    }
    if (!error.error || !error.status || !error.url) {
      return new Error(`${LOGTAG} Unknown error occurred.`);
    }
    switch (error.status) {
      case this.nativeHttp.ErrorCode.TIMEOUT:
        return new NativeHttpError(
          [
            'Es kam zu einer Zeitüberschreitung.',
            'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
          ].join(' '),
        );
      case this.nativeHttp.ErrorCode.NOT_CONNECTED:
        return new NativeHttpError(
          [
            'Es konnte keine Verbindung hergestellt werden.',
            'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
          ].join(' '),
        );
      default:
        return new NativeHttpError(`Ein unbekannter Fehler ist aufgetreten.`);
    }
  }
}
