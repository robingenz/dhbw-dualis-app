import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  public loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  constructor(private changeDetectionRef: ChangeDetectorRef, private dialogService: DialogService) {}

  public async submitLoginForm(loginFormGroup: FormGroup): Promise<void> {
    if (!loginFormGroup.valid) {
      await this.dialogService.showErrorAlert({ message: 'Bitte fülle alle Eingabefelder aus.' });
      return;
    }
    const loading = await this.dialogService.showLoading();
    // TODO
    loading.dismiss();
  }
}
