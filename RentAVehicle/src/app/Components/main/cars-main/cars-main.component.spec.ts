import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsMainComponent } from './cars-main.component';

describe('CarsMainComponent', () => {
  let component: CarsMainComponent;
  let fixture: ComponentFixture<CarsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
