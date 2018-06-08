import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesControlComponent } from './rates-control.component';

describe('RatesControlComponent', () => {
  let component: RatesControlComponent;
  let fixture: ComponentFixture<RatesControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
