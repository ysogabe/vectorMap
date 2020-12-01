import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { vectorExperimentLegend } from '../../../../../assets/vector-experiment-legend.json';

@Component({
  selector: 'app-railway',
  templateUrl: './railway.component.html',
  styleUrls: ['./railway.component.css'],
})
export class RailwayComponent implements OnInit, AfterViewInit {
  v: any;
  constructor() {}

  ngOnInit(): void {
    this.v = vectorExperimentLegend;
  }

  ngAfterViewInit(): void {}
}
