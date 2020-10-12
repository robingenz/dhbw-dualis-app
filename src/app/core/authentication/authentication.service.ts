import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpOptions, HttpResponse } from '@capacitor-community/http';
import { Session } from '../interfaces';
import { HttpMethod, NativeHttpService } from '../services';

interface LoginParams {
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
    const params: LoginParams = {
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
      method: HttpMethod.POST,
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params,
    };
    const response: HttpResponse = await this.nativeHttpService.request(options);
    const sessionKey = this.getSessionKeyFromHttpResponse(response);
    if (!sessionKey) {
      return false;
    }
    this.startSession(sessionKey);
    return true;
  }

  public logout(): void {
    return this.clearSession();
  }

  public getSession(): Session | null {
    return this.session;
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

  private getSessionKeyFromHttpResponse(response: HttpResponse): string | null {
    const refreshHeader = response.headers.refresh;
    if (!refreshHeader?.indexOf('STARTPAGE_DISPATCH')) {
      return null;
    }
    const url = refreshHeader.substr(refreshHeader.indexOf('URL=') + 4);
    let sessionKey = url.substr(url.indexOf('ARGUMENTS=') + 10);
    sessionKey = sessionKey.substr(0, sessionKey.indexOf(','));
    return sessionKey;
  }
}
