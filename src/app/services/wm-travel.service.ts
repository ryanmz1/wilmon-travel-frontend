import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { api } from "../../environments/envConfig";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class WmTravelService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = api.invokeUrl + '/travels';

  public getTravels(authToken: string) {
    return this.get4Api(this.API_URL, authToken);
  }

  private get4Api(url: string, authToken: string) {
    return this.httpClient.get(url, {
      headers: { 'Authorization': authToken }
    });
  }
}
