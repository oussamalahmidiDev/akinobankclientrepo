import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorQRComponent } from './two-factor-qr.component';

describe('TwoFactorQRComponent', () => {
  let component: TwoFactorQRComponent;
  let fixture: ComponentFixture<TwoFactorQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
