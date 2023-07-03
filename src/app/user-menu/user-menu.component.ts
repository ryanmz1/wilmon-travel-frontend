import { Component, OnInit,Input,ElementRef, ViewChild,Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { EventBusService } from "../services/event-bus.service";
import { AuthStoreService } from '../services/auth-store.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  
  constructor(private eventBusService: EventBusService,
    private render: Renderer2,
    public authStoreService: AuthStoreService,
    private router: Router) { }

  ngOnInit(): void {}

  public handleSignUp() {
    this.authStoreService.signUp();
  }

  public handleLogin() {
    this.authStoreService.login();
  }

  public handleSignout() {
    this.authStoreService.logout();
  }

}
