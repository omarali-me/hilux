import { Component, OnInit, Input } from '@angular/core';
import { FieldBase } from '../fields/field-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {

  @Input() field: FieldBase<string>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  get isValid() { return this.form.controls[this.field.fieldID].valid; }
}
