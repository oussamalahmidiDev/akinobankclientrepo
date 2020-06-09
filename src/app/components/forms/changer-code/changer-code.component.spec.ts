import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerCodeComponent } from './changer-code.component';

describe('ChangerCodeComponent', () => {
  let component: ChangerCodeComponent;
  let fixture: ComponentFixture<ChangerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
