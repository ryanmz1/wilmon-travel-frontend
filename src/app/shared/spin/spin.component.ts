import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.css']
})
export class SpinComponent implements OnInit {

  @ViewChild('spinModal', {static: true})
  private spinModal!: ElementRef;
  @Input()  
  public set spinOpen(v: boolean) {
    if (v) {
      this.openSpinModal();
    } else {
      this.closeSpinModal();
    }
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  public openSpinModal() {
    this.spinModal.nativeElement.classList.add('is-active');
  }

  public closeSpinModal() {
    this.spinModal.nativeElement.classList.remove('is-active');
  }

}
