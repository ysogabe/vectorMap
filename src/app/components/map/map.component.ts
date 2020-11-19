import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor() {}
  public map: Map | undefined;
  public cursor: string = 'auto';

  ngOnInit(): void {
    const baseLayer = new TileLayer({
      source: new XYZ({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
      }),
    });

    const typeLayer = new TileLayer({
      source: new XYZ({
        url: 'https://nlftp.mlit.go.jp/ksj/tile/L03-b/{z}/{x}/{y}.png',
      }),
      opacity: 0.3,
      minZoom: 12,
      maxZoom: 18,
    });

    const roadLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new GeoJSON(),
        url:
          'https://cyberjapandata.gsi.go.jp/xyz/experimental_rdcl/{z}/{x}/{y}.geojson',
      }),
      style: (f) => {
        console.log(f);
        console.log(f.get('rdCtg'));
        if (f.get('rdCtg') == '高速自動車国道等') {
          return new Style({
            stroke: new Stroke({
              color: 'red',
              width: 10,
              lineCap: 'butt',
            }),
          });
        }
        if (f.get('rdCtg') == '国道') {
          return new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 10,
              lineCap: 'butt',
            }),
          });
        }
        if (f.get('rdCtg') == '都道府県道') {
          return new Style({
            stroke: new Stroke({
              color: 'green',
              width: 10,
              lineCap: 'butt',
            }),
          });
        }
        return new Style({
          stroke: new Stroke({
            color: '#aaaaaa',
            width: 5,
            lineCap: 'butt',
          }),
        });
      },
      // if (f.get('rdCtg') == '国道' || f.properties['rdCtg'] == '都道府県道') {
      //   return { color: '#777777', weight: 5, opacity: 0.5, lineCap: 'butt' };
      // } else if (f.properties['rdCtg'] == '高速自動車国道等') {
      //   return { color: '#ff1493', weight: 5, opacity: 0.5, lineCap: 'butt' };
      // } else {
      //   if (f.properties['type'] == '通常部') {
      //     return {
      //       color: '#aaaaaa',
      //       weight: 2,
      //       opacity: 0.5,
      //       lineCap: 'butt',
      //     };
      //   } else {
      //     return {
      //       color: '#aaaaaa',
      //       weight: 2,
      //       opacity: 0.5,
      //       lineCap: 'butt',
      //       dashArray: '5,5',
      //     };
      //   }
      // }
      // return {
      //   color: '#aaaaaa',
      //   weight: 2,
      //   opacity: 0.5,
      //   lineCap: 'butt',
      //   dashArray: '5,5',
      // };
      opacity: 0.7,
      // minZoom: 16,
      // maxZoom: 18,
    });

    this.map = new Map({
      layers: [baseLayer, typeLayer, roadLayer],
      target: 'map',
      view: new View({
        center: fromLonLat([139.75, 35.68]),
        zoom: 16,
        minZoom: 2,
        maxZoom: 18,
      }),
    });
  }
}
