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
  private updateTravelTimeCallback = (user: any) => {
    console.log('meta_data updated');
    this.render.removeClass(this.saveSettingEl.nativeElement, 'is-loading');
    this.closeSetting();
    window.alert('Save Successfully!');
  };
  
  constructor(private messageService: EventBusService,
    private render: Renderer2,
    public authUserService: AuthUserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.messageService.on('userMessage', (msg: any) => {
      const { defaultTravelTime, address } = msg;
      if (defaultTravelTime) {
        console.log('defaultTravelTime and !travelTime true');
        this.appendLi('Your wilmon will travel at 19:30 every day, you can change this by your preference in setting.');
        this.updateTravelTime('19:30', null);
      }
      // const liEl = this.render.createElement('li');
      // const liTxt = this.render.createText(`Your wilmon now is traveling at `);
      if (address) {
        const bEl = this.render.createElement('b');
        const bTxt = this.render.createText(`${address}`);
        this.render.appendChild(bEl, bTxt);
        this.appendLi('Your wilmon now is traveling at ', bEl);
      }
      // this.render.appendChild(liEl, liTxt);
      // this.render.appendChild(liEl, bEl);
      // this.render.appendChild(this.messageEl.nativeElement, liEl);
    });
  }

  private appendLi(text: string, liChild: ElementRef | undefined = undefined, parent: ElementRef = this.messageEl.nativeElement) {
    const li = this.render.createElement('li');
    const liTxt = this.render.createText(text);
    this.render.appendChild(li, liTxt);
    if (liChild) {
      this.render.appendChild(li, liChild);
    }
    this.render.appendChild(parent, li);
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
    this.updateTravelTime(this.travelAt);
    // const hourMinute = this.travelAt.split(':');
    // const hour = Number(hourMinute[0]);
    // const minute = Number(hourMinute[1]);
    // const timezoneOffset = new Date().getTimezoneOffset() / 60;
    // this.authUserService.updateUserPreferences({
    //   'travelTimeAt': {
    //     'hour': hour + timezoneOffset,
    //     'minute': minute,
    //     '_timezoneOffset': timezoneOffset
    //   }
    // }).subscribe((user) => {
    //   console.log('meta_data updated');
    //   this.render.removeClass(this.saveSettingEl.nativeElement, 'is-loading');
    //   this.closeSetting();
    //   window.alert('Save Successfully!');
    // });
  }

  private updateTravelTime(travelAt: string, cb: any = this.updateTravelTimeCallback) {
    const hourMinute = travelAt.split(':');
    const hour = Number(hourMinute[0]);
    const minute = Number(hourMinute[1]);
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    this.authUserService.updateUserPreferences({
      'travelTimeAt': {
        'hour': hour + timezoneOffset,
        'minute': minute,
        '_timezoneOffset': timezoneOffset
      }
    }).subscribe(cb);
  }
}
