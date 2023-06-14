import { Component, OnInit,Input,ElementRef, ViewChild,Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { EventBusService } from "../services/event-bus.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  @ViewChild('loginLink',{static:true})
  private loginLink!: ElementRef
  @ViewChild('signoutLink',{static:true})
  private signoutLink!: ElementRef
  @ViewChild('signUpLink',{static:true})
  private signUpLink!: ElementRef

  constructor(private eventBusService: EventBusService,
    private render: Renderer2,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.eventBusService.on('toggleLogin', (payload: any) => {
      if (payload.login) {
        this.setSignOut();
      } else if (!payload.login) {
        this.setLoginAndSignUp();
      }
    });
  }

  public setSignOut() {
    this.render.setStyle(this.loginLink.nativeElement, 'display', 'none');
    this.render.setStyle(this.signUpLink.nativeElement, 'display', 'none');
    this.render.removeStyle(this.signoutLink.nativeElement, 'display');
  }

  // public removeSignUp() {
  //   this.render.setStyle(this.signUpLink.nativeElement, 'display', 'none');
  //   this.render.removeStyle(this.signoutLink.nativeElement, 'display');
  // }

  // public removeLogin() {
  //   this.render.setStyle(this.loginLink.nativeElement, 'display', 'none');
  //   this.render.removeStyle(this.signoutLink.nativeElement, 'display');
  // }

  public setLoginAndSignUp() {
    this.render.setStyle(this.signoutLink.nativeElement, 'display', 'none');
    this.render.removeStyle(this.signUpLink.nativeElement, 'display');
    this.render.removeStyle(this.loginLink.nativeElement, 'display');
  }

  public handleSignUp() {
    this.router.navigateByUrl('/auth/signup');
  }

  public handleLogin() {
    // this.eventBusService.emit({type:'loginModal',payload:{show:true}});
    this.router.navigateByUrl('/auth/login');
  }

  public handleSignout() {
    this.authService.signOut();
  }

}
