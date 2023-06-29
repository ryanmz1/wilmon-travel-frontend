import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { WmMapService } from 'src/app/services/wm-map.service';
import { WmTravelService } from 'src/app/services/wm-travel.service';

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
    private authService: AuthStoreService,
    private travelService: WmTravelService,
    private mapService: WmMapService,
    private router: Router) { }

  ngOnInit(): void {
    this.openLoginModal();
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
      // this.authService.fetchAuthToken().then((token) => {
      //   console.log(token);
      //   this.closeLoginModal();
      //   this.router.navigateByUrl('');
      //   this.eventBusService.emit({type:'toggleLogin', payload:{login:true}});
      //   this.travelService.getUserTravels().subscribe((res: any)=>{
      //     this.mapService.renderTravel(res.data);
      //     this.eventBusService.emit({type:'loadingDone'});
      //   });
      // });
    }, (err: Error) => alert(err));
    this.loginForm.reset();
  }

  public on2VisitorMode() {
    console.log('go to visitor mode');
    // this.eventBusService.emit({type:'loginModal',payload:{show:false}});
    this.closeLoginModal();
    // this.authService.VISITOR_MODE=true;
    this.router.navigateByUrl('');
    this.eventBusService.emit({type:'visitorMode'});
  }

}
