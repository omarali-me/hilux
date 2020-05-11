import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSelectComponent } from './step-select.component';

describe('StepSelectComponent', () => {
  let component: StepSelectComponent;
  let fixture: ComponentFixture<StepSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
