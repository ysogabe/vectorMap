import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailwayComponent } from './railway.component';

describe('RailwayComponent', () => {
  let component: RailwayComponent;
  let fixture: ComponentFixture<RailwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RailwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
