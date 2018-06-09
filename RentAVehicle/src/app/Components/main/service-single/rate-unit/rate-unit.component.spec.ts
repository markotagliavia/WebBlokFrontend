import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateUnitComponent } from './rate-unit.component';

describe('RateUnitComponent', () => {
  let component: RateUnitComponent;
  let fixture: ComponentFixture<RateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
