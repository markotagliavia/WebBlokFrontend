import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelClientManagingComponent } from './admin-panel-client-managing.component';

describe('AdminPanelClientManagingComponent', () => {
  let component: AdminPanelClientManagingComponent;
  let fixture: ComponentFixture<AdminPanelClientManagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelClientManagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelClientManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
