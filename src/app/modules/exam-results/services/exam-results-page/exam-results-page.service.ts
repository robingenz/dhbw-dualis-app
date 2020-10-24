import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { AuthenticationService, HttpMethod, NativeHttpService } from '@app/core';
import { HttpOptions, HttpResponse } from '@capacitor-community/http';
import { SemesterList } from '../../interfaces';

interface ExamResultsHttpParams {
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
    const params: ExamResultsHttpParams = {
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

  // public async getResultsFor(semester: Semester): Promise<any> {
  //   const session = this.authService.getSession();
  //   if (!session) {
  //     throw new Error('No active session'); // TODO
  //   }
  //   const params: ExamResultsHttpParams = {
  //     APPNAME: 'CampusNet',
  //     PRGNAME: 'COURSERESULTS',
  //     ARGUMENTS: `${session.key},-N000000${semester.id}`,
  //   };
  //   const options: HttpOptions = {
  //     method: HttpMethod.GET,
  //     url: [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join(''),
  //     data: params,
  //   };
  //   const response: HttpResponse = await this.nativeHttpService.request(options);
  //   return this.parseSemesterResultsHttpResponse(response);
  // }

  private parseSemestersHttpResponse(response: HttpResponse): SemesterList {
    const items = [];
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(response.data, 'text/html');
    const optionElements = doc.getElementById('semester')?.getElementsByTagName('option');
    for (const optionElement of Array.from(optionElements || [])) {
      items.push({
        id: optionElement.value,
        displayName: optionElement.innerHTML,
      });
    }
    return items;
  }

  // private parseSemesterResultsHttpResponse(response: HttpResponse): Semester[] {
  //   const semesters: Semester[] = [];
  //   const domparser = new DOMParser();
  //   const doc = domparser.parseFromString(response.data, 'text/html');
  //   const optionElements = doc.getElementById('semester')?.getElementsByTagName('option');
  //   for (const optionElement of Array.from(optionElements || [])) {
  //     semesters.push({
  //       id: optionElement.value,
  //       displayName: optionElement.innerHTML,
  //     });
  //   }
  //   return semesters;
  // }
}
