import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteSuspendFormComponent } from './compte-suspend-form.component';

describe('CompteSuspendFormComponent', () => {
  let component: CompteSuspendFormComponent;
  let fixture: ComponentFixture<CompteSuspendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteSuspendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteSuspendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
