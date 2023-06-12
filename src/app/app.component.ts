import { Component,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SpinComponent } from "./shared/spin/spin.component";
import { AuthService } from "./services/auth.service";
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
    private router: Router) {}

  ngOnInit() {
    this.authService.fetchAuthToken().then((token) => {
      if (!token) {
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
        this.travelService.getUserTravels(token).subscribe((res: any)=>{
          // console.log(data);
          this.mapService.renderTravel(res.data);
          this.eventBusService.emit({type:'loadingDone'});
        });
      }
    });
    this.eventBusService.on('visitorMode', () => {
      this.mapService.renderTravel(TRAVELS);
    })
  }
}
