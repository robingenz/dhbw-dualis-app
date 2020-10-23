import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExamResultsPageRoutingModule } from './exam-results-routing.module';
import { ExamResultsPage } from './pages';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExamResultsPageRoutingModule],
  declarations: [ExamResultsPage],
})
export class ExamResultsPageModule {}
