import { Component, OnInit, OnDestroy, ViewChild,ElementRef } from '@angular/core';
import {WmMapService} from "../services/wm-map.service";

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.css']
})
export class TravelMapComponent implements OnInit,OnDestroy {

  constructor(private mapService: WmMapService) { }

  @ViewChild('viewDiv',{ static: true })
  private mapEl!: ElementRef;

  ngOnInit(): void {
    // this.initializeMap().then(() =>{
    //   console.log('map loaded');
    // }).catch((reason) => console.log(reason));
    this.initializeMap();
  }

  initializeMap() {
    const container = this.mapEl.nativeElement;
    this.mapService.initializeMap(container).then(() => {
      console.log('base map ready');
    }).catch((reason) => {
      console.log(reason);
    });
  }

  ngOnDestroy(): void {
    if (this.mapService.view) {
      // destroy the map view
      this.mapService.view.destroy();
    }
  }

}
