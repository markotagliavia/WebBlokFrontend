import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPanelMainComponent } from './manager-panel-main.component';

describe('ManagerPanelMainComponent', () => {
  let component: ManagerPanelMainComponent;
  let fixture: ComponentFixture<ManagerPanelMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPanelMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
