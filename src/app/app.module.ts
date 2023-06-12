import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SpinComponent } from './shared/spin/spin.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent,
    UserMenuComponent,
    SpinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
