import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchControlComponent } from './branch-control.component';

describe('BranchControlComponent', () => {
  let component: BranchControlComponent;
  let fixture: ComponentFixture<BranchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
