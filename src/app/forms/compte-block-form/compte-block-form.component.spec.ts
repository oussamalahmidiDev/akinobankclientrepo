import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteBlockFormComponent } from './compte-block-form.component';

describe('CompteBlockFormComponent', () => {
  let component: CompteBlockFormComponent;
  let fixture: ComponentFixture<CompteBlockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteBlockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteBlockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
