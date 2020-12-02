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

  constructor() {}
  // ngAfterViewChecked(): void {
  //   console.log('==============');
  //   const el = document.getElementById('regend');
  //   console.log(el);
  //   this.map.addControl(
  //     new Control({
  //       element: el ? el : undefined,
  //     })
  //   );
  // }

  ngOnInit(): void {}
}
