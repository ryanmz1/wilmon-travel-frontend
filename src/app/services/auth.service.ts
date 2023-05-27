import { Injectable } from '@angular/core';
import { cognito, api } from '../../environments/envConfig';
import { CognitoUserPool,AuthenticationDetails,CognitoUser } from "amazon-cognito-identity-js";
// import * as AWSCognito from 'aws-sdk/clients/cognitoidentityserviceprovider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private poolData = {
    UserPoolId: cognito.userPoolId,
    ClientId: cognito.userPoolClientId,
  };
  
  private userPool = new CognitoUserPool(this.poolData);

  public fetchAuthToken(): Promise<any> {
    return new Promise((resolve, reject)=> {
      const cognitoUser = this.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: Error, session: any) => {
          if (err) {
            reject(err);
          } else if (!session.isValid()) {
            resolve(null);
          } else {
            resolve(session.getIdToken().getJwtToken());
          }
        });
      } else {
        resolve(null);
      }
    });
  }
  
  public login(email: string, password: string, onSuccess: any, onFailure: any) {
    const authenticationDetails = new AuthenticationDetails(
      {
        Username: this.toUsername(email),
        Password: password,
      }
    );
  
    const cognitoUser = this.createCognitoUser(email);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  }
  
  public verify(email: string, code: string, onSuccess: any, onFailure: any) {
    this.createCognitoUser(email).confirmRegistration(
      code,
      true,
      function confirmCallback(err: any, result: any) {
        if (!err) {
          onSuccess(result);
        } else {
          onFailure(err);
        }
      }
    );
  }

  private createCognitoUser(email: string) {
    return new CognitoUser({
      Username: this.toUsername(email),
      Pool: this.userPool,
    });
  }

  private toUsername(email: string) {
    return email.replace('@', '-at-');
  }

  private getCurrentUser() {
    return this.userPool.getCurrentUser();
}
}
