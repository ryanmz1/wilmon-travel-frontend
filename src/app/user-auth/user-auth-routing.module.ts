import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAuthComponent } from './user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: UserAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }