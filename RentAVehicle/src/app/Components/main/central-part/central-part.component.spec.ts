import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralPartComponent } from './central-part.component';

describe('CentralPartComponent', () => {
  let component: CentralPartComponent;
  let fixture: ComponentFixture<CentralPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
