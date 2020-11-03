import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamResultsPage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: ExamResultsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamResultsPageRoutingModule {}
