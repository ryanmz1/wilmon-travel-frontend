import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserAuthRoutingModule } from "./user-auth-routing.module";
import { UserAuthComponent } from "./user-auth.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";


@NgModule({
  declarations: [
    UserAuthComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserAuthRoutingModule
  ],
  exports: []
})
export class UserAuthModule { }
