import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupGeneratorComponent } from './field-group-generator.component';

describe('FieldGroupGeneratorComponent', () => {
  let component: FieldGroupGeneratorComponent;
  let fixture: ComponentFixture<FieldGroupGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGroupGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
