import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HTTPResponse } from '@ionic-native/http/ngx';
import { Session } from '../interfaces';
import { NativeHttpMethod, NativeHttpService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private session: Session | null = null;

  constructor(private nativeHttpService: NativeHttpService) {}

  public async login(username: string, password: string): Promise<boolean> {
    await this.setRequiredSessionCookie();
    const sessionKey = await this.sendLoginRequest(username, password);
    if (!sessionKey) {
      return false;
    }
    this.startSession(sessionKey);
    return true;
  }

  public async logout(): Promise<void> {
    if (!this.session) {
      return;
    }
    await this.sendLogoutRequest(this.session.key);
    return this.clearSession();
  }

  public getSession(): Session | null {
    return this.session;
  }

  public refreshSessionExpirationTimestamp(): void {
    if (!this.session) {
      return;
    }
    this.session.expirationTimestamp = this.getExpirationTimestamp();
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

  private async setRequiredSessionCookie(): Promise<void> {
    await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        '?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome',
      ].join(''),
    });
  }

  private async sendLoginRequest(username: string, password: string): Promise<string | null> {
    const data: { [name: string]: string } = {
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
    const headers: { [name: string]: string } = {
      'Content-Type': 'multipart/form-data; charset=UTF-8',
    };
    const response: HTTPResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.POST,
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      data: data,
      headers: headers,
    });
    return this.getSessionKeyFromHttpResponse(response);
  }

  private async sendLogoutRequest(sessionKey: string): Promise<void> {
    await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=LOGOUT&ARGUMENTS=-N${sessionKey},-N001`,
      ].join(''),
    });
  }

  private getSessionKeyFromHttpResponse(response: HTTPResponse): string | null {
    const refreshHeader = response.headers.refresh;
    if (!refreshHeader?.indexOf('STARTPAGE_DISPATCH')) {
      return null;
    }
    const refreshHeaderRegex = refreshHeader.match(/ARGUMENTS=-N\d+,/);
    return refreshHeaderRegex ? refreshHeaderRegex[0].replace('ARGUMENTS=-N', '').replace(',', '') : null;
  }
}
