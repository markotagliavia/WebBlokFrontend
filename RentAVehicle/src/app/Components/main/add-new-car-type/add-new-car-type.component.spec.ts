import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCarTypeComponent } from './add-new-car-type.component';

describe('AddNewCarTypeComponent', () => {
  let component: AddNewCarTypeComponent;
  let fixture: ComponentFixture<AddNewCarTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCarTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
