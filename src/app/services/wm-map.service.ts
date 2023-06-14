import { Injectable } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import Graphic from "@arcgis/core/Graphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import Point from "@arcgis/core/geometry/Point";

@Injectable({
  providedIn: 'root'
})
export class WmMapService {

  constructor() { }

  public view!: MapView;
  private _map!: Map;
  private _pinSymbol = new TextSymbol({
    color: '#f50856',
    text: '\ue61d',
    font: {
      size: 20,
      family: 'CalciteWebCoreIcons',
    },
  });
  private _wilmonSymbol = new PictureMarkerSymbol({
    url: '/assets/images/pika-icon.png',
    width: '25px',
    height: '25px',
  });

  public initializeMap(container: HTMLDivElement): Promise<any> {
    this._map = new Map({
      basemap: 'gray-vector'
    });
    this.view = new MapView({
      container,
      center: [-123.04, 49.3],
      map: this._map,
      zoom: 12,
    });
    this.view.popup.dockOptions.position = 'bottom-left';
    return this.view.when();
  }

  public setCenter(coordinates: any) {
    this.view.center = coordinates;
    this.view.zoom = 4;
    console.log('view.center', this.view.center);
  }

  public renderTravel(travels: any) {
    for (let i = 0; i < travels.length; i++) {
      const element = travels[i];
      // if (i === travels.length - 1) {
      if (i === 0) {
        this.setCenter({
          latitude: element.coordinates.latitude + 3,
          longitude: element.coordinates.longitude,
        });
        this.setLocation(element, true);
      } else {
        this.setLocation(element);
      }
    }
  }

  public setLocation(location: any, latest = false) {
    const { coordinates, imageUrl, address } = location;
    // console.log('iamgeUrl:', iamgeUrl);
    const point = new Point({
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    });
    const pinGraphic = new Graphic({
      geometry: point,
      symbol: this._pinSymbol,
    });
    const wilmonGraphic = new Graphic({
      geometry: point,
      symbol: this._wilmonSymbol,
      popupTemplate: {
        title: 'Travel on ' + '2020-03-09',
        content: [
          {
            type: 'media',
            mediaInfos: [
              {
                title: address,
                type: 'image',
                value: {
                  sourceURL: imageUrl,
                },
              }
            ]
          }
        ]
      }
    });
    const graphics = latest ? wilmonGraphic : pinGraphic;
    this.view.graphics.add(graphics);
  }
}
