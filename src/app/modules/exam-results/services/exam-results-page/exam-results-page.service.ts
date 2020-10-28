import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { AuthenticationService } from '@app/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Exam, Semester, SemesterList, SemesterListItem } from '../../interfaces';
import { DualisHtmlParserService } from '../dualis-html-parser/dualis-html-parser.service';

@Injectable({
  providedIn: 'root',
})
export class ExamResultsPageService {
  constructor(
    private authService: AuthenticationService,
    private nativeHttp: HTTP,
    private dualisHtmlParserService: DualisHtmlParserService,
  ) {}

  public async getSemesterList(): Promise<SemesterList> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error('No active session'); // TODO
    }
    const response: HTTPResponse = await this.nativeHttp.get(
      [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${session.key},-N000000`,
      ].join(''),
      {},
      {},
    );
    return this.dualisHtmlParserService.parseSemesterList(response.data);
  }

  public async getSemesterByListItem(item: SemesterListItem): Promise<Semester | null> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error('No active session'); // TODO
    }
    const response: HTTPResponse = await this.nativeHttp.get(
      [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${session.key},-N000000,-N${item.id}`,
      ].join(''),
      {},
      {},
    );
    const totalCredits = this.dualisHtmlParserService.parseSemesterCredits(response.data) || '';
    const gpa = this.dualisHtmlParserService.parseSemesterGpa(response.data) || '';
    const units = this.dualisHtmlParserService.parseUnits(response.data) || [];
    const promises = units.map(async (unit) => {
      unit.exams = (await this.getExamsByUnitId(unit.id)) || [];
    });
    await Promise.all(promises);
    return {
      id: item.id,
      displayName: item.displayName,
      gpa,
      totalCredits,
      units,
    };
  }

  private async getExamsByUnitId(unitId: string): Promise<Exam[] | null> {
    return [];
    // const session = this.authService.getSession();
    // if (!session) {
    //   throw new Error('No active session'); // TODO
    // }
    // const response: HTTPResponse = await this.nativeHttp.get(
    //   [
    //     Config.dualisBaseUrl,
    //     '/scripts/mgrqispi.dll',
    //     `?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N${session.key},-N000000,-N${unitId}`,
    //   ].join(''),
    //   {},
    //   {},
    // );
    // return this.dualisHtmlParserService.parseExams(response.data);
  }
}
