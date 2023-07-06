import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { EventBusService } from "../../services/event-bus.service";

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.css']
})
export class SpinComponent implements OnInit {

  @ViewChild('spinModal', {static: true})
  private spinModal!: ElementRef;
  // @Input('spinOpen')
  // public set spinOpen(v: boolean) {
  //   if (v) {
  //     this.openSpinModal();
  //   } else {
  //     this.closeSpinModal();
  //   }
  // }
  
  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    console.log('spin init');
    // this.openSpinModal();
    // setTimeout(() => {
    // this.eventBusService.emit({type:'loading'});
      
    // }, 2000);
    this.eventBusService.on('loading', (payload: any) => {
      this.openSpinModal();
    });
    this.eventBusService.on('loadingDone', (payload: any) => {
      this.closeSpinModal();
    });
  }

  public openSpinModal() {
    this.spinModal.nativeElement.classList.add('is-active');
  }

  public closeSpinModal() {
    this.spinModal.nativeElement.classList.remove('is-active');
  }

}
