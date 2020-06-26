import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteActivateFormComponent } from './compte-activate-form.component';

describe('CompteActivateFormComponent', () => {
  let component: CompteActivateFormComponent;
  let fixture: ComponentFixture<CompteActivateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteActivateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteActivateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
