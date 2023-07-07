import { Inject, Injectable } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from '@angular/common';
import { concatMap, tap, map, delay } from 'rxjs/operators';
import { EventBusService } from "./event-bus.service";
import { environment as env } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { auth0Api } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  // public VISITOR_MODE = false;
  public authToken: string | undefined;
  private userId: string | undefined;
  private auth0UserApiUri: string = '';
  public userMetadata: any;
  public set auth0UserId(id: string | undefined) {
    this.userId = id;
    this.auth0UserApiUri = `${auth0Api}/users/${id}`;
  }

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private httpClient: HttpClient) { }

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

  public getUser() {
    return this.httpClient.get(
      encodeURI(this.auth0UserApiUri)
      // encodeURI(`${auth0Api}/user/${id}`)
    );
  }

  public updateUserMetadata(meta_data: any) {
    return this.httpClient.patch(
      encodeURI(this.auth0UserApiUri), {
        "user_metadata": meta_data
      }
    ).pipe(tap((user: any) => {
      console.log(user,'from callback');
      this.userMetadata = user.user_metadata;
    }));
  }
}
