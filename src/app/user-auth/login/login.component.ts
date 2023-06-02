import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { WmMapService } from 'src/app/services/wm-map.service';
import { WmTravelService } from 'src/app/services/wm-travel.service';
import { TRAVELS } from "../../visitorTravels";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginModal',{ static: true })
  private loginEl!: ElementRef;
  public loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private travelService: WmTravelService,
    private mapService: WmMapService) { }

  ngOnInit(): void {
    this.eventBusService.on('loginModal', (payload: any) => {
      if (payload.show) {
        this.openLoginModal();
      } else if (!payload.show) {
        this.closeLoginModal();
      }
    });
  }

  public openLoginModal() {
    this.loginEl.nativeElement.classList.add('is-active');
  }

  public closeLoginModal() {
    this.loginEl.nativeElement.classList.remove('is-active');
  }

  public onLogin() {
    let { email, password } = this.loginForm.value;
    email = typeof email === 'string'? email : '';
    password = typeof password === 'string'? password : '';
    this.authService.login(email,password,()=> {
      this.eventBusService.emit({type:'loading'});
      this.authService.fetchAuthToken().then((token) => {
        console.log(token);
        this.closeLoginModal();
        this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
        this.travelService.getUserTravels(token).subscribe((res: any)=>{
          this.mapService.renderTravel(res.data);
          this.eventBusService.emit({type:'loadingDone'});
        });
      });
    }, (err: Error) => alert(err));
    this.loginForm.reset();
  }

  public on2VisitorMode() {
    console.log('go to visitor mode');
    this.eventBusService.emit({type:'loginModal',payload:{show:false}});
    this.mapService.renderTravel(TRAVELS);
    // this._visitorMode=true;
  }

}
