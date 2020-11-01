import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SemesterGpaBarComponent, SemesterSelectComponent, UnitCardComponent } from './components';
import { ExamResultsPageRoutingModule } from './exam-results-routing.module';
import { ExamResultsPage } from './pages';
import { EmptyStringPipe, GradePipe } from './pipes';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExamResultsPageRoutingModule],
  declarations: [
    ExamResultsPage,
    SemesterGpaBarComponent,
    SemesterSelectComponent,
    UnitCardComponent,
    EmptyStringPipe,
    GradePipe,
  ],
})
export class ExamResultsPageModule {}
