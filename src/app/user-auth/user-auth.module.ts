import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    UserAuthRoutingModule,
  ],
  exports: []
})
export class UserAuthModule { }
