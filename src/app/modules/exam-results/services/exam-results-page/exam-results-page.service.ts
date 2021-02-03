import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { AuthenticationService, NativeHttpMethod, NativeHttpService, SessionError } from '@app/core';
import { HttpResponse } from '@capacitor-community/http';
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
    const sessionKey = this.getSessionKey();
    const response: HttpResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${sessionKey},-N000000`,
      ].join(''),
    });
    return this.dualisHtmlParserService.parseSemesterList(response.data);
  }

  public async getSemesterByListItem(item: SemesterListItem): Promise<Semester | null> {
    const sessionKey = this.getSessionKey();
    const response: HttpResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N${sessionKey},-N000000,-N${item.id}`,
      ].join(''),
    });
    const totalCredits = this.dualisHtmlParserService.parseSemesterCredits(response.data) || '';
    const gpa = this.dualisHtmlParserService.parseSemesterGpa(response.data) || '';
    const units = this.dualisHtmlParserService.parseUnits(response.data) || [];
    const promises = units.map(async unit => {
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
    const sessionKey = this.getSessionKey();
    const response: HttpResponse = await this.nativeHttpService.request({
      method: NativeHttpMethod.GET,
      url: [
        Config.dualisBaseUrl,
        '/scripts/mgrqispi.dll',
        `?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N${sessionKey},-N000000,-N${unitId}`,
      ].join(''),
    });
    return this.dualisHtmlParserService.parseExams(response.data);
  }

  private getSessionKey(): string {
    const session = this.authService.getSession();
    if (!session || session.isExpired()) {
      throw new SessionError(`Current session is expired.`);
    }
    session.resetExpirationDate();
    return session.key;
  }
}
