import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule, AuthHttpInterceptor } from "@auth0/auth0-angular";

import { environment as env } from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: env.auth.domain,
      clientId: env.auth.clientId,
      authorizationParams: { redirect_uri: env.auth.authorizationParams.redirect_uri }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
