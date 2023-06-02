import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelMapComponent } from './travel-map/travel-map.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user-auth/user-auth.module').then(m => m.UserAuthModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
