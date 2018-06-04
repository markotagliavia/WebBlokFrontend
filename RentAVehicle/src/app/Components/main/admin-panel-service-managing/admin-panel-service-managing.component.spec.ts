import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelServiceManagingComponent } from './admin-panel-service-managing.component';

describe('AdminPanelServiceManagingComponent', () => {
  let component: AdminPanelServiceManagingComponent;
  let fixture: ComponentFixture<AdminPanelServiceManagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelServiceManagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelServiceManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
