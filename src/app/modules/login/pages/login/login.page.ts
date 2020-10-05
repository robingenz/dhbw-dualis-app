import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  constructor(private changeDetectionRef: ChangeDetectorRef, private alertCtrl: AlertController) {}

  public async submitLoginForm(loginFormGroup: FormGroup): Promise<void> {
    if (!loginFormGroup.valid) {
      await this.showAlert('Einloggen fehlgeschlagen! Bitte fülle alle Eingabefelder aus.');
    }
    // TODO
  }

  private async showAlert(subHeader: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Fehlgeschlagen!',
      subHeader: subHeader,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
