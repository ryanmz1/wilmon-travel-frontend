import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, tap, map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { AuthUserService } from "./services/auth-user.service";
import { WmMapService } from './services/wm-map.service';
import { WmTravelService } from "./services/wm-travel-api.service";
import { EventBusService } from "./services/event-bus.service";
import { auth0Api } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'wilmon-travel-frontend-angular';

  constructor(private authService: AuthService,
    private mapService: WmMapService,
    private travelService: WmTravelService,
    private eventBusService: EventBusService,
    private router: Router,
    private authUserService: AuthUserService,
    private http: HttpClient) {}

  ngOnInit() {
    // user$ observable is configured so that it only starts to emit values once the isAuthenticated$ observable is true
    // this.eventBusService.emit({type:'loading'});
    // this.authService.user$
    // .pipe(
    //   concatMap((user) => 
    //     this.http.get(
    //       encodeURI(`${auth0Api}/users/${user?.sub}`)
    //     )
    //   ),
    //   map((user: any) => user.user_metadata))
    // .subscribe((user_meta) => {
    //   console.log('loggedin, meta_data:\n');
    //   console.log(user_meta);
    //   // this.eventBusService.emit({type:'loading'});
    //   this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
    //   this.authService.idTokenClaims$.subscribe((tokenClaims) => {
    //     // console.log('enter tokenClaims');
    //     if (!this.authStore.authToken) {
    //       this.authStore.authToken = tokenClaims?.__raw;
    //       this.travelService.getUserTravels().subscribe((res: any)=>{
    //         // console.log(data);
    //         this.mapService.renderTravel(res.data);
    //         // this.eventBusService.emit({type:'loadingDone'});
    //       });
    //     }
    //   });
    // });

    // this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
    //   if (!isAuthenticated) {
    //     // this.eventBusService.emit({type:'loading'});
    //     // this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
    //     // this.authService.idTokenClaims$.subscribe((tokenClaims) => {
    //     //   // console.log('enter tokenClaims');
    //     //   if (!this.authStore.authToken) {
    //     //     this.authStore.authToken = tokenClaims?.__raw;
    //     //     this.travelService.getUserTravels().subscribe((res: any)=>{
    //     //       // console.log(data);
    //     //       this.mapService.renderTravel(res.data);
    //     //       this.eventBusService.emit({type:'loadingDone'});
    //     //     });
    //     //   }
    //     // });
    //   // } else {
    //     console.log('no auth...');
    //     this.eventBusService.emit({type:'toggleLogin', payload:{login:false}});
    //     this.router.navigateByUrl('/auth');
    //   }
    // });
  }

  ngAfterViewInit() {
    // user$ observable is configured so that it only starts to emit values once the isAuthenticated$ observable is true
    this.eventBusService.emit({type:'loading'});
    // this.authService.user$
    // .pipe(
    //   tap((user) => this.authUserService.auth0UserId = user?.sub),
    //   concatMap(() => 
    //     this.authUserService.getUser()
    //     // this.http.get(
    //     //   encodeURI(`${auth0Api}/users/${user?.sub}`)
    //     // )
    //   ),
    //   // map((user: any) => user.user_metadata),
    //   tap((user: any) => this.authUserService.userMetadata = user.user_metadata)
    //   // tap((user: any) => this.authUserService.user = user)
    // )
    // .subscribe((user) => {
    //   console.log('loggedin:\n');
    //   console.log(user,'meta_data:',this.authUserService.userMetadata);
    //   // this.eventBusService.emit({type:'loading'});
    //   // this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
    //   this.authService.idTokenClaims$.subscribe((tokenClaims) => {
    //     // console.log('enter tokenClaims');
    //     if (!this.authUserService.authToken) {
    //       this.authUserService.authToken = tokenClaims?.__raw;
    //       this.travelService.getUserTravels().subscribe((res: any)=>{
    //         // console.log(data);
    //         this.mapService.renderTravel(res.data);
    //         this.eventBusService.emit({type:'loadingDone'});
    //       });
    //     }
    //   });
    // });

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log('isAuthenticated:',isAuthenticated);
      if (isAuthenticated) {
        // this.eventBusService.emit({type:'loading'});
        // this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
        // this.authService.idTokenClaims$.subscribe((tokenClaims) => {
        //   // console.log('enter tokenClaims');
        //   if (!this.authStore.authToken) {
        //     this.authStore.authToken = tokenClaims?.__raw;
        //     this.travelService.getUserTravels().subscribe((res: any)=>{
        //       // console.log(data);
        //       this.mapService.renderTravel(res.data);
        //       this.eventBusService.emit({type:'loadingDone'});
        //     });
        //   }
        // });
        this.authService.user$
        .pipe(
          tap((user) => this.authUserService.auth0UserId = user?.sub),
          concatMap(() => 
            this.authUserService.getUser()
            // this.http.get(
            //   encodeURI(`${auth0Api}/users/${user?.sub}`)
            // )
          ),
          // map((user: any) => user.user_metadata),
          tap((user: any) => this.authUserService.userMetadata = user.user_metadata)
          // tap((user: any) => this.authUserService.user = user)
        )
        .subscribe((user) => {
          console.log('loggedin:\n');
          console.log(user,'meta_data:',this.authUserService.userMetadata);
          // this.eventBusService.emit({type:'loading'});
          // this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
          this.authService.idTokenClaims$.subscribe((tokenClaims) => {
            // console.log('enter tokenClaims');
            if (!this.authUserService.authToken) {
              this.authUserService.authToken = tokenClaims?.__raw;
              this.travelService.getUserTravels().subscribe((res: any)=>{
                // console.log(data);
                this.mapService.renderTravel(res.data);
                this.eventBusService.emit({type:'loadingDone'});
              });
            }
          });
        });
      } else {
        console.log('no auth...');
        this.eventBusService.emit({type:'loadingDone'});
        // this.eventBusService.emit({type:'toggleLogin', payload:{login:false}});
        this.router.navigateByUrl('/auth');
      }
    });
  }
}
