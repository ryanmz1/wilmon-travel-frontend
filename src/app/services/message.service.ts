import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject();
  public currentMessage=this.messageSource.asObservable();

  constructor() { }

  public sendMessage(message: string) {
    this.messageSource.next(message)
  }
}
