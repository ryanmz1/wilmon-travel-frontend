import { Injectable } from '@angular/core';
import { CognitoAuthService } from "./cognito-auth.service";
import { MessageService } from "../services/message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cognitoAuthService: CognitoAuthService) { }

  public fetchAuthToken(): Promise<any> {
    return this.cognitoAuthService.fetchAuthToken();
  }
  
  public login(email: string, password: string, onSuccess: any, onFailure: any) {
    this.cognitoAuthService.login(email, password, onSuccess, onFailure);
  }
  
  public verify(email: string, code: string, onSuccess: any, onFailure: any) {
    
  }

  public signOut() {
    this.cognitoAuthService.signOut();
  }

  public signUp(email: string, password: string, onSuccess: any, onFailure: any) {
    this.cognitoAuthService.signUp(email, password, onSuccess, onFailure);
  }
}
