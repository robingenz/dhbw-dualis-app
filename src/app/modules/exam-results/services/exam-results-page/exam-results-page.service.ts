import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { AuthenticationService, HttpMethod, NativeHttpService } from '@app/core';
import { HttpOptions, HttpResponse } from '@capacitor-community/http';
import { Exam, SemesterList, SemesterListItem } from '../../interfaces';

interface InputHttpParams {
  APPNAME: string;
  PRGNAME: string;
  ARGUMENTS: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExamResultsPageService {
  constructor(private authService: AuthenticationService, private nativeHttpService: NativeHttpService) {}

  public async getSemesterList(): Promise<SemesterList> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error('No active session'); // TODO
    }
    const params: InputHttpParams = {
      APPNAME: 'CampusNet',
      PRGNAME: 'COURSERESULTS',
      ARGUMENTS: `${session.key},-N000000`,
    };
    const options: HttpOptions = {
      method: HttpMethod.GET,
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      data: params,
    };
    const response: HttpResponse = await this.nativeHttpService.request(options);
    return this.parseSemestersHttpResponse(response);
  }

  public async getSemesterResultsFor(semester: SemesterListItem): Promise<any> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error('No active session'); // TODO
    }
    const params: InputHttpParams = {
      APPNAME: 'CampusNet',
      PRGNAME: 'COURSERESULTS',
      ARGUMENTS: `${session.key},-N000000,-N${semester.id}`,
    };
    const options: HttpOptions = {
      method: HttpMethod.GET,
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      data: params,
    };
    const response: HttpResponse = await this.nativeHttpService.request(options);
    return this.parseSemesterResultsHttpResponse(response);
  }

  // TODO: replace ref
  // private async getUnitResultsFor(ref: string): Promise<Exam[]> {
  //   const options: HttpOptions = {
  //     method: HttpMethod.GET,
  //     url: [Config.dualisBaseUrl, ref].join(''),
  //   };
  //   const response: HttpResponse = await this.nativeHttpService.request(options);
  //   return this.parseExamResultsHttpResponse(response);
  // }
  private async getUnitResultsFor(unitId: string): Promise<Exam[]> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error('No active session'); // TODO
    }
    const params: InputHttpParams = {
      APPNAME: 'CampusNet',
      PRGNAME: 'RESULTDETAILS',
      ARGUMENTS: `${session.key},-N000000,-N${unitId}`,
    };
    const options: HttpOptions = {
      method: HttpMethod.GET,
      url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
      data: params,
    };
    const response: HttpResponse = await this.nativeHttpService.request(options);
    return this.parseExamResultsHttpResponse(response);
  }
}
