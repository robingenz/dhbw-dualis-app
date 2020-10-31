import { TestBed } from '@angular/core/testing';
import { SemesterList } from '../../interfaces';
import { DualisHtmlParserService } from './dualis-html-parser.service';

describe('DualisHtmlParserService', () => {
  let service: DualisHtmlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DualisHtmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct semester list', async () => {
    const html = `<div class="formRow">
                <div class="inputFieldLabel long">
                  <label for="semester">Semester:</label>
                  <select id="semester" name="semester">
                    <option value="000000015058000" selected="selected">SU 2020</option>
                    <option value="000000015048000">WI 2019/20</option>
                  </select>
                  <input name="Refresh" type="submit" value="Refresh" class="img img_arrowReload">
                </div>
              </div>`;
    const exspectedResult: SemesterList = [
      {
        id: '000000015058000',
        displayName: 'SU 2020',
      },
      {
        id: '000000015048000',
        displayName: 'WI 2019/20',
      },
    ];
    const list = service.parseSemesterList(html);
    expect(list).toEqual(exspectedResult);
  });

  it('should return the correct gpa and semester credits', async () => {
    const html = `<div id="contentSpacer_IE" class="pageElementTop">
                  <div>
                    <table class="nb list">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        <tr></tr>
                        <tr>
                        <th colspan="2">Semester GPA</th>
                        <th class="tbdata">  1,4</th>
                        <th> 58,0</th><th class="tbdata" colspan="4">&nbsp;</th></tr>
                      </tbody>
                    </table>
                  </div>
                  </div>`;
    const exspectedGpa: string = '1,4';
    const gpa = service.parseSemesterGpa(html);
    expect(gpa).toEqual(exspectedGpa);
    const exspectedSemesterCredits: string = '58,0';
    const semesterCredits = service.parseSemesterCredits(html);
    expect(semesterCredits).toEqual(exspectedSemesterCredits);
  });
});
