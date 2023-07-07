import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule, AuthHttpInterceptor } from "@auth0/auth0-angular";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { environment as env } from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SpinComponent } from "./shared/spin/spin.component";

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
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: env.auth.domain,
      clientId: env.auth.clientId,
      authorizationParams: { 
        redirect_uri: env.auth.authorizationParams.redirect_uri,
        audience: env.auth.authorizationParams.audience,
        scope: env.auth.authorizationParams.scope
      },
      httpInterceptor: env.httpInterceptor
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
