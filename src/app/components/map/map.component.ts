import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import VectorTileLayer, { Options as VectorOption } from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVTFormat from 'ol/format/MVT';
import { fromLonLat } from 'ol/proj';
import vtStyle from './vtStyle';
import {
  DragRotateAndZoom,
  Select,
  Translate,
  defaults as defaultInteraction,
} from 'ol/interaction';
import {
  Attribution,
  Rotate,
  ZoomSlider,
  OverviewMap,
  ScaleLine,
  FullScreen,
  defaults as defaultControls,
} from 'ol/control';

import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

interface VectorLayerOptions extends VectorOption {
  /**
   * Title of the layer displayed in the LayerSwitcher panel
   */
  title?: string;
  /**
   * Type of the layer, a layer of `type: 'base'` is treated as a base map
   * layer by the LayerSwitcher and is displayed with a radio button
   */
  type?: 'base';
  /**
   * Internal property used to track the indeterminate state of a layer/ group
   *
   * @protected
   */
  indeterminate?: boolean;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor() {
    this.map = new Map({});
  }
  public map: Map;
  public cursor: string = 'auto';

  ngOnInit(): void {
    const basePaleLayerTile = new LayerTile({
      title: '標準地図（淡色）',
      type: 'base',
      visible: true,
      source: new XYZ({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel=”noopener noreferrer”>地理院タイル</a>',
        ],
      }),
    } as BaseLayerOptions);

    const baseStdLayerTile = new LayerTile({
      title: '標準地図',
      type: 'base',
      visible: true,
      source: new XYZ({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      }),
    } as BaseLayerOptions);

    const baseBlankLayerTile = new LayerTile({
      title: '白地図',
      type: 'base',
      visible: true,
      source: new XYZ({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel=”noopener noreferrer”>地理院タイル</a>',
        ],
      }),
    } as BaseLayerOptions);

    const basePhotoLayerTile = new LayerTile({
      title: '写真',
      // type: 'base',
      visible: true,
      source: new XYZ({
        url:
          'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
        attributions: [
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel=”noopener noreferrer”>地理院タイル</a>',
        ],
      }),
      opacity: 0.6,
    } as BaseLayerOptions);

    const overViewLayer = new TileLayer({
      source: new XYZ({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel=”noopener noreferrer”>地理院タイル</a>',
        ],
      }),
    });

    const tileLayerTile = new LayerTile({
      title: '土地利用細分',
      visible: true,
      source: new XYZ({
        url: 'https://nlftp.mlit.go.jp/ksj/tile/L03-b/{z}/{x}/{y}.png',
        attributions: [
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel=”noopener noreferrer”>地理院タイル</a>',
        ],
      }),
      opacity: 0.5,
      minZoom: 12,
      maxZoom: 18,
    } as BaseLayerOptions);

    const roadLayerTile = new VectorTileLayer({
      title: '道路など',
      visible: true,
      source: new VectorTileSource({
        format: new MVTFormat({
          layers: ['road', 'railway'],
        }),
        url:
          'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf',
        attributions: [
          '<a href="https://github.com/gsi-cyberjapan/gsimaps-vector-experiment" target="_blank" rel=”noopener noreferrer”>国土地理院ベクトルタイル提供実験</a>',
        ],
      }),
      style: (f, n) => vtStyle(f, n),
      opacity: 0.8,
    } as VectorLayerOptions);

    const baseMaps = new LayerGroup({
      title: 'ベースマップ',
      layers: [basePaleLayerTile, baseStdLayerTile, baseBlankLayerTile],
      fold: 'open',
    } as GroupLayerOptions);

    const overLayMaps = new LayerGroup({
      title: 'オーバーレイ',
      layers: [tileLayerTile, roadLayerTile, basePhotoLayerTile],
      fold: 'open',
    } as GroupLayerOptions);

    this.map = new Map({
      controls: defaultControls().extend([
        new ZoomSlider(),
        new ScaleLine({
          steps: 10,
          minWidth: 200,
          bar: true,
        }),
        new Attribution(),
        new FullScreen(),
        new OverviewMap({
          layers: [overViewLayer],
          collapsed: false,
        }),
        new Rotate(),
        new LayerSwitcher({
          activationMode: 'click',
          startActive: false,
          collapseTipLabel: '地図切替',
          tipLabel: '表示地図切替',
          reverse: false,
          groupSelectStyle: 'children',
        }),
      ]),

      interactions: defaultInteraction().extend([new DragRotateAndZoom()]),
      layers: [baseMaps, overLayMaps],
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
