import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { AuthenticationService, NativeHttpMethod, NativeHttpService } from '@app/core';
import { HTTPResponse } from '@ionic-native/http/ngx';
import { Exam, Semester, SemesterList, SemesterListItem } from '../../interfaces';
import { DualisHtmlParserService } from '../dualis-html-parser/dualis-html-parser.service';

const LOGTAG = '[ExamResultsPageService]';

@Injectable({
  providedIn: 'root',
})
export class ExamResultsPageService {
  constructor(
    private authService: AuthenticationService,
    private nativeHttpService: NativeHttpService,
    private dualisHtmlParserService: DualisHtmlParserService,
  ) {}

  public async getSemesterList(): Promise<SemesterList> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error(`${LOGTAG} No session found.`);
    }
    const response: HTTPResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${session.key},-N000000`,
      ].join(''),
    });
    return this.dualisHtmlParserService.parseSemesterList(response.data);
  }

  public async getSemesterByListItem(item: SemesterListItem): Promise<Semester | null> {
    const session = this.authService.getSession();
    if (!session) {
      throw new Error(`${LOGTAG} No session found.`);
    }
    const response: HTTPResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${session.key},-N000000,-N${item.id}`,
      ].join(''),
    });
    const totalCredits = this.dualisHtmlParserService.parseSemesterCredits(response.data) || '';
    const gpa = this.dualisHtmlParserService.parseSemesterGpa(response.data) || '';
    const units = this.dualisHtmlParserService.parseUnits(response.data) || [];
    const promises = units.map(async (unit) => {
      const exams = await this.getExamsByUnitId(unit.id);
      unit.exams = exams || [];
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
    const session = this.authService.getSession();
    if (!session) {
      throw new Error(`${LOGTAG} No session found.`);
    }
    const response: HTTPResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N${session.key},-N000000,-N${unitId}`,
      ].join(''),
    });
    return this.dualisHtmlParserService.parseExams(response.data);
  }
}
