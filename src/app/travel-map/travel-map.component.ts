import { Component, OnInit, OnDestroy, ViewChild,ElementRef } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.css']
})
export class TravelMapComponent implements OnInit,OnDestroy {

  // constructor(private _map: Map,private _view: MapView) { }
  constructor() { }

  @ViewChild('viewDiv',{ static: true })
  private mapEl!: ElementRef;
  private _map!: Map;
  public view!: MapView;

  ngOnInit(): void {
    this.initializeMap().then(() =>{
      console.log('map loaded');
    }).catch((reason) => console.log(reason));
    // this.initializeMap();
  }

  initializeMap(): Promise<any> {
    const container = this.mapEl.nativeElement;
    this._map = new Map({
      basemap: 'gray-vector'
    });

    this.view = new MapView({
      container,
      center: [-123.04, 49.3],
      map: this._map,
      zoom: 12,
    });
    return this.view.when();
  }

  // initializeMap(): void {
  //   const container = this.mapEl.nativeElement;
  //   this._map = new Map({
  //     basemap: 'gray-vector'
  //   });

  //   this.view = new MapView({
  //     container,
  //     center: [-123.04, 49.3],
  //     map: this._map,
  //     zoom: 12,
  //   });
  // }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

}
