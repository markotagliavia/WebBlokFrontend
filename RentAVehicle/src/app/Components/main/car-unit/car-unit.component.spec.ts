import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUnitComponent } from './car-unit.component';

describe('CarUnitComponent', () => {
  let component: CarUnitComponent;
  let fixture: ComponentFixture<CarUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
