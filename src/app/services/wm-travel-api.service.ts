import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { api } from "../../environments/envConfig";
import { AuthUserService } from "./auth-user.service";

@Injectable({
  providedIn: 'root'
})
export class WmTravelService {

  constructor(private httpClient: HttpClient,
    private authUserService: AuthUserService) { }

  private API_URL = api.invokeUrl + '/travels';

  // public getUserTravels(authToken: string) {
  //   return this.get4Api(this.API_URL, authToken);
  // }
  public getUserTravels() {
    // return this.httpClient.get(this.API_URL);
    return this.get4Api(this.API_URL);
  }

  private get4Api(url: string, authToken = null) {
    const token = typeof this.authUserService.authToken === 'string' ? this.authUserService.authToken : '';
    return this.httpClient.get(url, {
      headers: { 'Authorization':  token}
    });
  }
}
