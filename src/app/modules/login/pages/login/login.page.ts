import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService, NativeHttpError } from '@app/core';

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

  constructor(
    private dialogService: DialogService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  public async submitLoginForm(loginFormGroup: FormGroup): Promise<void> {
    if (!loginFormGroup.valid) {
      await this.dialogService.showErrorAlert({ message: 'Bitte fülle alle Eingabefelder aus.' });
      return;
    }
    return this.login(loginFormGroup.value.username, loginFormGroup.value.password);
  }

  private async login(username: string, password: string): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const successfulLogin: boolean = await this.authService.login(username, password);
      if (successfulLogin === true) {
        await this.router.navigate(['/exam-results'], { replaceUrl: true });
      } else {
        await this.dialogService.showErrorAlert({ message: 'Benutzername oder Passwort falsch.' });
      }
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
}
