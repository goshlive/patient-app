import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemindersPage } from './reminders.page';

const routes: Routes = [
  {
    path: '',
    component: RemindersPage
  },
  {
    path: 'reminder-detail',
    loadChildren: () => import('./reminder-detail/reminder-detail.module').then( m => m.ReminderDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemindersPageRoutingModule {}
