import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeScreenRegComponent } from './welcome-screen-reg.component';

describe('WelcomeScreenRegComponent', () => {
  let component: WelcomeScreenRegComponent;
  let fixture: ComponentFixture<WelcomeScreenRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeScreenRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeScreenRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
