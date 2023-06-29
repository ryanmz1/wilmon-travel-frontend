import { Inject, Injectable } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { CognitoAuthService } from "./cognito-auth.service";
import { EventBusService } from "./event-bus.service";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  // public VISITOR_MODE = false;
  public authToken: string | undefined;

  constructor(private cognitoAuthService: CognitoAuthService,
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  public fetchAuthToken(): Promise<any> {
    return this.cognitoAuthService.fetchAuthToken();
  }
  
  public login(email: string, password: string, onSuccess: any, onFailure: any) {
    this.cognitoAuthService.login(email, password, onSuccess, onFailure);
  }

  // login(): void {
  //   // Call this to redirect the user to the login page
  //   this.auth.loginWithPopup();
  // }
  
  public verify(email: string, code: string, onSuccess: any, onFailure: any) {
    this.cognitoAuthService.verify(email, code, onSuccess, onFailure);
  }

  public signOut() {
    this.cognitoAuthService.signOut();
    window.location.reload();
  }

  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({ 
      logoutParams: { 
        returnTo: this.doc.location.origin 
      }
    });
  }

  public signUp(email: string, password: string, onSuccess: any, onFailure: any) {
    this.cognitoAuthService.signUp(email, password, onSuccess, onFailure);
  }
}
