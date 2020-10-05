import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './pages';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule, ReactiveFormsModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}
