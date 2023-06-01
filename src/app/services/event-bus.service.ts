import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject,Observable, Subscription, filter,map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private messageSource = new Subject<EventMessage>();

  constructor() { }

  public emit(message: EventMessage) {
    this.messageSource.next(message);
  }

  public on(eventType: string, action: any): Subscription {
    return this.messageSource.pipe(
      filter((e: EventMessage) => eventType === e.type),
      map((e: EventMessage) => e.payload)
    ).subscribe(action);
  }
}

export interface EventMessage {
  type: string;
  payload?: any;
}
