import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserAuthRoutingModule } from "./user-auth-routing.module";
import { UserAuthComponent } from "./user-auth.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginButtonComponent } from "./login/login-button.component";
import {  } from "./log-out-button.component";

@NgModule({
  declarations: [
    UserAuthComponent,
    LoginComponent,
    SignUpComponent,
    LoginButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserAuthRoutingModule,
  ],
  exports: []
})
export class UserAuthModule { }
