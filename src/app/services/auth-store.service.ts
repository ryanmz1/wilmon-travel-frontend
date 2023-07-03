import { Inject, Injectable } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { EventBusService } from "./event-bus.service";
import { DOCUMENT } from '@angular/common';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  // public VISITOR_MODE = false;
  public authToken: string | undefined;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  public login(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithPopup().subscribe(() => {
      // Make sure back to the callback url
      window.location.href = env.auth.authorizationParams.redirect_uri;
    });
  }

  public logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({ 
      logoutParams: { 
        returnTo: this.doc.location.origin 
      }
    });
  }

  public signUp(): void {
    this.auth.loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
