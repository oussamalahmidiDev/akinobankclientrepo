import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementConfirmationComponent } from './virement-confirmation.component';

describe('VirementConfirmationComponent', () => {
  let component: VirementConfirmationComponent;
  let fixture: ComponentFixture<VirementConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
