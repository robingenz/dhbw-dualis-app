import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService, NativeHttpError, SessionError } from '@app/core';
import { Plugins } from '@capacitor/core';
import { Semester, SemesterList, SemesterListItem, Unit } from '../../interfaces';
import { ExamResultsPageService } from '../../services';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.page.html',
  styleUrls: ['./exam-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamResultsPage implements OnInit {
  public semesterList: SemesterList | undefined;
  public semesterResults: Semester | undefined;
  public searchbarValue: string = '';

  constructor(
    private dialogService: DialogService,
    private authService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private examResultsPageService: ExamResultsPageService,
  ) {}

  public ngOnInit(): void {
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
      } else if (error instanceof SessionError) {
        await this.authService.logout();
        await this.router.navigate(['/login'], { replaceUrl: true });
      } else {
        throw error;
      }
    } finally {
      this.searchbarValue = '';
      this.cdr.markForCheck();
      await loading.dismiss();
    }
  }

  public trackByUnitId(index: number, item: Unit): string {
    return item.id;
  }

  public hideKeyboard(): void {
    Plugins.Keyboard.hide();
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
