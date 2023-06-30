import { Component,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';

import { SpinComponent } from "./shared/spin/spin.component";
import { AuthStoreService } from "./services/auth-store.service";
import { WmMapService } from './services/wm-map.service';
import { WmTravelService } from "./services/wm-travel.service";
import { EventBusService } from "./services/event-bus.service";
import { TRAVELS } from './visitorTravels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wilmon-travel-frontend-angular';
  // @ViewChild(UserAuthComponent, { static: true })
  // private userAuthComponent!: UserAuthComponent;
  // public loading = false;
  // public loggedin = false;
  /**
   *
   */
  constructor(private authService: AuthService,
    private mapService: WmMapService,
    private travelService: WmTravelService,
    private eventBusService: EventBusService,
    private router: Router,
    private authStore: AuthStoreService) {}

  ngOnInit() {
    // this.authService.handleRedirectCallback(window.location.origin).subscribe((res) => {
    //   console.log(res);
    // });
    // if (window.location.search.includes("code=") &&
    //   window.location.search.includes("state=")) {
    //     this.authService.handleRedirectCallback().subscribe((res) => {
    //       console.log(res);
    //     });
    //   }
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('loggedin');
        this.eventBusService.emit({type:'loading'});
        this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
        // console.log(window.location.href);

        // if (window.location.href !== window.location.origin) {
          
        // }
        this.authService.idTokenClaims$.subscribe((tokenClaims) => {
          this.authStore.authToken = tokenClaims?.__raw;
          this.travelService.getUserTravels().subscribe((res: any)=>{
            // console.log(data);
            this.mapService.renderTravel(res.data);
            this.eventBusService.emit({type:'loadingDone'});
          });
        });
      } else {
        console.log('no auth...');
        this.eventBusService.emit({type:'toggleLogin', payload:{login:false}});
        this.router.navigateByUrl('/auth');
      }
    });
  }
    /*// if (this.authService.isAuthenticated$) {
    //   console.log(this.authService.user$.subscribe((user) => console.log('user:',user)));
    // }
    // this.authService.fetchAuthToken().then((token) => {
      // if (!token) {
      if (!this.authService.isAuthenticated$) {
        // this.eventBusService.emit({type:'loginModal',payload:{show:true}});
        this.eventBusService.emit({type:'toggleLogin', payload:{login:false}});
        // console.log(this.authService.VISITOR_MODE);
        // if (this.authService.VISITOR_MODE) {
        //   console.log('visitor mode');
        //   this.mapService.renderTravel(TRAVELS);
        // } else {
        //   this.router.navigateByUrl('/auth');
        // }
        this.router.navigateByUrl('/auth');
      } else {
        console.log('loggedin');
        this.eventBusService.emit({type:'loading'});
        this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
        this.authService.idTokenClaims$.subscribe((tokenClaims) => {
          this.authStore.authToken = tokenClaims?.__raw;
          this.travelService.getUserTravels().subscribe((res: any)=>{
            // console.log(data);
            this.mapService.renderTravel(res.data);
            this.eventBusService.emit({type:'loadingDone'});
          });
        });
      }
    this.eventBusService.on('visitorMode', () => {
      this.mapService.renderTravel(TRAVELS);
    })
  }*/
}
