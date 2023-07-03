import { Component,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';

import { AuthStoreService } from "./services/auth-store.service";
import { WmMapService } from './services/wm-map.service';
import { WmTravelService } from "./services/wm-travel.service";
import { EventBusService } from "./services/event-bus.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'wilmon-travel-frontend-angular';

  constructor(private authService: AuthService,
    private mapService: WmMapService,
    private travelService: WmTravelService,
    private eventBusService: EventBusService,
    private router: Router,
    private authStore: AuthStoreService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
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
      } else {
        console.log('no auth...');
        this.eventBusService.emit({type:'toggleLogin', payload:{login:false}});
        this.router.navigateByUrl('/auth');
      }
    });
  }
}
