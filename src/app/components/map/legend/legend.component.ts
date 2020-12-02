import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { Control } from 'ol/control';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  @Input()
  map!: Map;

  isShow: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.map);
    let el = document.getElementById('regend');
    this.map.addControl(
      new Control({
        element: el ? el : undefined,
      })
    );
    console.log(el);
  }
  toggleLegend(): void {
    this.isShow = this.isShow ? false : true;
    console.log(this.isShow);
  }
}
