import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SpinComponent } from './shared/spin/spin.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent,
    UserMenuComponent,
    UserAuthComponent,
    SpinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
