import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from "./user-auth-routing.module";
import { UserAuthComponent } from "./user-auth.component";
import { LoginButtonComponent } from "./login-button.component";
import { LogoutButtonComponent } from "./log-out-button.component";

@NgModule({
  declarations: [
    UserAuthComponent,
    LoginButtonComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
  ],
  exports: []
})
export class UserAuthModule { }
