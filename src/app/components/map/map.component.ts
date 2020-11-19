import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVTFormat from 'ol/format/MVT';
import { fromLonLat } from 'ol/proj';
import vtStyle from './vtStyle';

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
        format: new MVTFormat({
          layers: ['road', 'railway'],
        }),
        url:
          'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf',
        attributions: [
          '<a href="https://github.com/gsi-cyberjapan/gsimaps-vector-experiment" target="_blank" rel=”noopener noreferrer”>国土地理院</a>',
        ],
      }),
      style: (f, n) => vtStyle(f, n),
      opacity: 0.7,
    });

    this.map = new Map({
      layers: [baseLayer, typeLayer, roadLayer],
      target: 'map',
      view: new View({
        center: fromLonLat([139.75, 35.68]),
        zoom: 16,
        minZoom: 8,
        maxZoom: 17,
      }),
    });
  }
}
