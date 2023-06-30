import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { WmMapService } from "../services/wm-map.service";
import { AuthStoreService } from "../services/auth-store.service";
import { EventBusService } from "../services/event-bus.service";
import { WmTravelService } from "../services/wm-travel.service";
import { TRAVELS } from "../visitorTravels";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private mapService: WmMapService,
    private authStore: AuthStoreService,
    private eventBusService: EventBusService,
    private travelService: WmTravelService,
    private router: Router) { }

  @ViewChild('modeModal',{ static: true })
  private modeEl!: ElementRef;
  // @ViewChild('loginModal',{ static: true })
  // private loginEl!: ElementRef;
  @Output()
  private modeNotifier = new EventEmitter<any>();

  private _visitorMode=false;

  ngOnInit(): void {
    console.log('user-auth init...');
    this.openModeModal();
  }

  public openModeModal() {
    this.modeEl.nativeElement.classList.add('is-active');
  }

  public closeModeModal() {
    this.modeEl.nativeElement.classList.remove('is-active');
  }

  public handleMode(mode: string) {
    if (mode === 'visitor') {
      console.log('choose visitor mode');
      this.closeModeModal();
      this.router.navigateByUrl('');
      this.eventBusService.emit({type:'visitorMode'});
    } else if (mode === 'user') {
      console.log('choose user mode');
      // this.closeModeModal();
      // this.eventBusService.emit({type:'loginModal',payload:{show:true}});
      // this.router.navigateByUrl('/auth/login');
      this.authStore.login();
      this._visitorMode=false;
    }
  }
  
}
