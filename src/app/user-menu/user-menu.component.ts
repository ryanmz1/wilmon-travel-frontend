import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';
import { EventBusService } from "../services/event-bus.service";
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  @ViewChild('settingModal', { static: true })
  private settingEl!: ElementRef;
  @ViewChild('guestSettingModal', { static: true })
  private guestSettingEl!: ElementRef;
  @ViewChild('saveSettingBtn', { static: true })
  private saveSettingEl!: ElementRef;
  @ViewChild('userMessages', { static: true })
  private messageEl!: ElementRef;
  public travelAt: string = '';
  public travelTimeOptions: Array<string> = [
    '0:30', '1:30', '2:30', '3:30', '4:30', '5:30', '6:30', '7:30', '8:30', '9:30',
    '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30',
    '19:30', '20:30', '21:30', '22:30', '23:30'
  ];
  
  constructor(private messageService: EventBusService,
    private render: Renderer2,
    public authUserService: AuthUserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.messageService.on('userMessage', (msg: any) => {
      const { address } = msg;
      const liEl = this.render.createElement('li');
      const liTxt = this.render.createText(`Your wilmon now is traveling at `);
      const bEl = this.render.createElement('b');
      const bTxt = this.render.createText(`${address}`);
      this.render.appendChild(bEl, bTxt);
      this.render.appendChild(liEl, liTxt);
      this.render.appendChild(liEl, bEl);
      this.render.appendChild(this.messageEl.nativeElement, liEl);
    })
  }

  public handleLogin() {
    this.authUserService.login();
  }

  public handleSignout() {
    this.authUserService.logout();
  }

  public handleSetting() {
    console.log('user_metadata:',this.authUserService.userMetadata);
    const preferredTravelTimeAt = this.authUserService.userMetadata.preferences.travelTimeAt;
    this.travelAt = `${preferredTravelTimeAt.hour - preferredTravelTimeAt._timezoneOffset}:${preferredTravelTimeAt.minute}`
    this.openSetting();
  }

  public openGuestSetting() {
    this.guestSettingEl.nativeElement.classList.add('is-active');
  }

  public closeGuestSetting() {
    this.guestSettingEl.nativeElement.classList.remove('is-active');
  }

  private openSetting() {
    this.settingEl.nativeElement.classList.add('is-active');
  }

  public closeSetting() {
    this.settingEl.nativeElement.classList.remove('is-active');
  }

  public saveSetting() {
    this.render.addClass(this.saveSettingEl.nativeElement, 'is-loading');
    console.log(this.travelAt);
    const hourMinute = this.travelAt.split(':');
    const hour = Number(hourMinute[0]);
    const minute = Number(hourMinute[1]);
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    this.authUserService.updateUserPreferences({
      'travelTimeAt': {
        'hour': hour + timezoneOffset,
        'minute': minute,
        '_timezoneOffset': timezoneOffset
      }
    }).subscribe((user) => {
      console.log('meta_data updated');
      this.render.removeClass(this.saveSettingEl.nativeElement, 'is-loading');
      this.closeSetting();
      window.alert('Save Successfully!');
    });
  }

}
