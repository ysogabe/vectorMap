import { Component, Input, OnInit } from '@angular/core';
import { landUseSubdivisionMesh } from '../../../../../assets/landuse-legend.json';

@Component({
  selector: 'app-land-use',
  templateUrl: './land-use.component.html',
  styleUrls: ['./land-use.component.css'],
})
export class LandUseComponent implements OnInit {
  v: any;
  constructor() {}

  ngOnInit(): void {
    this.v = landUseSubdivisionMesh;
  }
}
