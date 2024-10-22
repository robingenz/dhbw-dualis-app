import { Injectable } from '@angular/core';
import { Exam, SemesterList, SemesterListItem, Unit } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DualisHtmlParserService {
  constructor() {}

  public parseSemesterList(html: string): SemesterList {
    const items: SemesterListItem[] = [];
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const optionElms = doc.getElementById('semester')?.getElementsByTagName('option');
    for (const optionElm of Array.from(optionElms || [])) {
      items.push({
        id: optionElm.value,
        displayName: optionElm.innerHTML,
      });
    }
    return items;
  }

  public parseSemesterGpa(html: string): string | null {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElm = doc.getElementById('contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElms = tbodyElm?.getElementsByTagName('tr');
    if (!trElms) {
      return null;
    }
    for (const trElm of Array.from(trElms)) {
      const thElms = trElm.getElementsByTagName('th');
      if (thElms.length < 1) {
        continue;
      }
      return thElms[1].innerHTML.trim();
    }
    return null;
  }

  public parseSemesterCredits(html: string): string | null {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElm = doc.getElementById('contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElms = tbodyElm?.getElementsByTagName('tr');
    if (!trElms) {
      return null;
    }
    for (const trElm of Array.from(trElms)) {
      const thElms = trElm.getElementsByTagName('th');
      if (thElms.length < 1) {
        continue;
      }
      return thElms[2].innerHTML.trim();
    }
    return null;
  }

  public parseUnits(html: string): Unit[] | null {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const tbodyElm = doc.getElementById('contentSpacer_IE')?.getElementsByTagName('tbody')[0];
    const trElms = tbodyElm?.getElementsByTagName('tr');
    if (!trElms) {
      return null;
    }
    const units: Unit[] = [];
    for (const trElm of Array.from(trElms)) {
      const tdElms = trElm.getElementsByTagName('td');
      if (tdElms.length < 1) {
        continue;
      }
      const scriptContent = tdElms[5].getElementsByTagName('script')[0].innerHTML;
      const scriptContentRegex = scriptContent.match(/,-N\d+",/);
      const id = scriptContentRegex ? scriptContentRegex[0].replace(',-N', '').replace('",', '') : '';
      const no = tdElms[0].textContent?.trim() || '';
      const displayName = tdElms[1].textContent?.trim() || '';
      const finalGrade = tdElms[2].textContent?.trim() || '';
      const credits = tdElms[3].textContent?.trim() || '';
      const status = tdElms[4].textContent?.trim() || '';
      units.push({
        id,
        no,
        displayName,
        finalGrade,
        credits,
        status,
        exams: undefined,
      });
    }
    return units;
  }

  public parseExams(html: string): Exam[] | null {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const tableElm = doc.getElementsByTagName('table')[0];
    const trElms = tableElm.getElementsByTagName('tr');
    const exams: Exam[] = [];
    for (const trElm of Array.from(trElms)) {
      const tbdataElms = trElm.getElementsByClassName('tbdata');
      if (tbdataElms.length < 1) {
        continue;
      }
      const attempt = tbdataElms[0].textContent?.trim() || '';
      const displayName = tbdataElms[1].textContent?.trim() || '';
      const date = tbdataElms[2].textContent?.trim() || '';
      const grade = tbdataElms[3].textContent?.trim() || '';
      const externalAccepted = tbdataElms[4].textContent?.trim() || '';
      exams.push({
        attempt,
        date,
        displayName,
        externalAccepted,
        grade,
      });
    }
    return exams;
  }
}
