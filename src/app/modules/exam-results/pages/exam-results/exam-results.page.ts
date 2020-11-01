import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { NativeHttpError } from '@app/core/classes';
import { ViewDidEnter } from '@ionic/angular';
import { Semester, SemesterList, SemesterListItem } from '../../interfaces';
import { ExamResultsPageService } from '../../services';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.page.html',
  styleUrls: ['./exam-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamResultsPage implements OnInit, ViewDidEnter {
  public semesterList: SemesterList | undefined;
  public semesterResults: Semester | undefined;

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

  public async selectSemester(listItem: SemesterListItem): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const semester = await this.examResultsPageService.getSemesterByListItem(listItem);
      if (!semester) {
        await this.dialogService.showErrorAlert({ message: 'Das Semester wurde nicht gefunden.' });
        return;
      }
      this.semesterResults = semester;
    } catch (error) {
      if (error instanceof NativeHttpError) {
        await this.dialogService.showErrorAlert({
          message: error.message,
        });
      } else {
        throw error;
      }
    } finally {
      this.cdr.markForCheck();
      await loading.dismiss();
    }
  }

  public async logout(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      await this.authService.logout();
      await this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      if (error instanceof NativeHttpError) {
        await this.dialogService.showErrorAlert({
          message: error.message,
        });
      } else {
        throw error;
      }
    } finally {
      await loading.dismiss();
    }
  }

  private async loadSemesterList(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      this.semesterList = await this.examResultsPageService.getSemesterList();
    } catch (error) {
      if (error instanceof NativeHttpError) {
        await this.dialogService.showErrorAlert({
          message: error.message,
        });
      } else {
        throw error;
      }
    } finally {
      this.cdr.markForCheck();
      await loading.dismiss();
    }
  }
}
