import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowUserComponent } from './table-row-user.component';

describe('TableRowUserComponent', () => {
  let component: TableRowUserComponent;
  let fixture: ComponentFixture<TableRowUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
