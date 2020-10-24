import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { ViewDidEnter } from '@ionic/angular';
import { SemesterList } from '../../interfaces';
import { ExamResultsPageService } from '../../services';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.page.html',
  styleUrls: ['./exam-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamResultsPage implements OnInit, ViewDidEnter {
  private semesterList: SemesterList | undefined;

  constructor(
    private dialogService: DialogService,
    private authService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private examResultsPageService: ExamResultsPageService,
  ) {}

  public ngOnInit(): void {}

  public ionViewDidEnter(): void {
    this.loadSemesterList();
  }

  public async selectSemester(event: string): Promise<void> {
    // let semester: Semester;
    console.log(event);
    // if (event) {
    //   semester = event.target.value;
    // }
    // await loader.present();
    // try {
    //   this.semesterResults = await this.examResultsPageService.getSemesterResults(semester);
    // } catch (error) {
    //   await this.showAlert();
    // } finally {
    //   this.cdr.markForCheck();
    //   await this.loadingCtrl.dismiss();
    // }
  }

  public async logout(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      await this.authService.logout();
      await this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      // TODO: testen, wie sich das Plugin bei keiner/schlechter Verbindung verhält
      await this.dialogService.showErrorAlert({
        message: [
          'Es konnte keine Verbindung hergestellt werden.',
          'Bitte überprüfe deine Internetverbindung und versuche es später nochmal.',
        ].join(' '),
      });
    } finally {
      await loading.dismiss();
    }
  }

  private async loadSemesterList(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      this.semesterList = await this.examResultsPageService.getSemesterList();
    } catch (error) {
      // TODO: testen (siehe oben)
      await this.dialogService.showErrorAlert({ message: 'Es konnte keine Verbindung hergestellt werden.' });
    } finally {
      this.cdr.markForCheck();
      await loading.dismiss();
    }
  }
}
