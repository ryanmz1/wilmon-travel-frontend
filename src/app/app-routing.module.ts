import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelMapComponent } from './travel-map/travel-map.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: TravelMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
