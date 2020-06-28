import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-radio-button-field',
  templateUrl: './radio-button-field.component.html',
  styleUrls: ['./radio-button-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class RadioButtonFieldComponent implements OnInit {
  dataOptions: any;

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;

  @Input() formErrors: any;

  @Input() defaultValues: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    this.service.getFieldData(this.field, this.fullFormData).subscribe((data)=> {
      this.dataOptions = data;
    })
    this.getDefaultValue(this.field.fieldID);
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  // handleChange($event) {
  //   if (!this.formData[this.field.fieldID])
  //     this.formData[this.field.fieldID] = [];

  //   if ($event.target.checked)
  //     this.formData[this.field.fieldID][0] = $event.target.value;
  //   else
  //     _.remove(this.formData[this.field.fieldID], i => i === $event.target.value);
  // }

  // optionSelected(val: any) {
  //   return this.formData[this.field.fieldID] && this.formData[this.field.fieldID].includes(val);
  // }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, this.index);
  }
}
