import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpOptions, HttpParams, HttpResponse } from '@capacitor-community/http';
import { Session } from '../interfaces';
import { HttpMethod, NativeHttpService } from '../services';

interface LoginHttpParams extends HttpParams {
  usrname: string;
  pass: string;
  APPNAME: string;
  PRGNAME: string;
  ARGUMENTS: string;
  clino: string;
  browser: string;
  platform: string;
  menuno: string;
  persno: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private session: Session | null = null;

  constructor(private nativeHttpService: NativeHttpService) {}

  public async login(username: string, password: string): Promise<boolean> {
    await this.setRequiredSessionCookie();
    const params: LoginHttpParams = {
      usrname: username,
      pass: password,
      APPNAME: 'CampusNet',
      PRGNAME: 'LOGINCHECK',
      ARGUMENTS: 'clino,usrname,pass,menuno,persno,browser,platform',
      clino: '000000000000001',
      browser: '',
      platform: '',
      menuno: '000324',
      persno: '00000000',
    };
    const options: HttpOptions = {
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      method: HttpMethod.Get,
      params: params,
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
      },
    };
    const response: HttpResponse = await this.nativeHttpService.request(options);
    const refreshHeader = response.headers.refresh;
    if (refreshHeader && refreshHeader.indexOf('STARTPAGE_DISPATCH')) {
      const url = refreshHeader.substr(refreshHeader.indexOf('URL=') + 4);
      let sessionKey: string = url.substr(url.indexOf('ARGUMENTS=') + 10);
      sessionKey = sessionKey.substr(0, sessionKey.indexOf(','));
      this.startSession(sessionKey);
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    return this.clearSession();
  }

  public getSession(): Session | null {
    return this.session;
  }

  private async setRequiredSessionCookie(): Promise<HttpResponse> {
    const options: HttpOptions = {
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome',
      ].join(''),
      method: HttpMethod.Get,
    };
    return await this.nativeHttpService.request(options);
  }

  private startSession(sessionKey: string): void {
    this.session = { key: sessionKey, expirationTimestamp: this.getExpirationTimestamp() };
  }

  private clearSession(): void {
    this.session = null;
  }

  private getExpirationTimestamp(): number {
    return Date.now() + Config.dualisTokenExpirationTimeMs;
  }
}
