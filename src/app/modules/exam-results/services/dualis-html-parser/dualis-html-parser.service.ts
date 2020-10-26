import { Injectable } from '@angular/core';
import { Exam, Semester, SemesterList, Unit } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DualisHtmlParserService {
  constructor() {}

  private parseSemesterList(html: string): SemesterList {
    const items = [];
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, 'text/html');
    const optionElms = doc.getElementById('semester')?.getElementsByTagName('option');
    for (const optionElm of Array.from(optionElms || [])) {
      items.push({
        id: optionElm.value,
        displayName: optionElm.innerHTML,
      });
    }
    return items;
  }

  private parseSemesterResults(html: string): Semester {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, 'text/html');
    const tbodyElm = doc.getElementById('contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElms = tbodyElm?.getElementsByTagName('tr');
    let gpa = 0;
    let totalCredits = 0;
    const units: Unit[] = [];
    for (const trElm of Array.from(trElms || [])) {
      const tdElms = trElm.getElementsByTagName('td');
      const thElms = trElm.getElementsByTagName('th');
      if (tdElms.length > 0) {
        const unit = this.parseUnitResults(tdElms);
        units.push(unit);
        continue;
      }
      if (thElms.length > 0) {
        const unit = this.parseUnitResults(tdElms);
        units.push(unit);
        continue;
      }
    }
    const semester: Semester = {
      gpa,
      totalCredits,
      units,
    };
    return semester;
  }

  private parseUnitResults(tdElms: HTMLCollectionOf<HTMLTableDataCellElement>): Unit {
    const scriptContent = tdElms[5].getElementsByTagName('script')[0].innerHTML;
    const id = scriptContent.substr(
      scriptContent.indexOf('"') + 1,
      scriptContent.indexOf('"', scriptContent.indexOf('"') + 1) - scriptContent.indexOf('"') - 1,
    );
    const no: string = tdElms[0].innerHTML.trim();
    const name: string = tdElms[1].innerHTML.trim();
    const finalGrade: string = tdElms[2].innerHTML.trim();
    const credits: string = tdElms[3].innerHTML.trim();
    const status: string = tdElms[4].innerHTML.trim();
    const exams: Exam[] = [];
    const unit: Unit = {
      id,
      no,
      name,
      finalGrade,
      credits,
      status,
      exams,
    };
    return unit;
  }

  private aaa(thElms: HTMLCollectionOf<HTMLTableHeaderCellElement>): Partial<Semester> {
    const gpa: string = thElms[1].innerHTML.trim();
    const totalCredits: string = thElms[2].innerHTML.trim();
    const semester: Partial<Semester> = {
      gpa,
      totalCredits,
    };
    return semester;
  }

  private parseExamResults(html: string): Exam[] {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, 'text/html');
    const tableElm = doc.getElementsByTagName('table')[0];
    const trElms = tableElm.getElementsByTagName('tr');
    const exams: Exam[] = [];
    for (const trElm of Array.from(trElms)) {
      const tbdataElms = trElm.getElementsByClassName('tbdata');
      if (tbdataElms.length < 1) {
        continue;
      }
      const attempt: string = tbdataElms[0].innerHTML.trim();
      const displayName: string = tbdataElms[1].innerHTML.trim();
      const date: string = tbdataElms[2].innerHTML.trim();
      const grade: string = tbdataElms[3].innerHTML.trim();
      const externalAccepted: string = tbdataElms[4].innerHTML.trim();
      const exam: Exam = {
        attempt,
        date,
        displayName,
        externalAccepted,
        grade,
      };
      exams.push(exam);
    }
    return exams;
  }
}
