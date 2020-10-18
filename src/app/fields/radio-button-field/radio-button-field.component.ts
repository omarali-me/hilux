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
      this.getDefaultValue(this.field.fieldID);
    })
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, this.index);
    if (!!this.formData[this.field.fieldID])
      this.prepareDisplayValues();
  }

  getValue(value: any) {
    return value.toString();
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index);
  }

  handleChange($event) {
    if (!this.formData[this.field.fieldID])
      this.formData[this.field.fieldID] = undefined;

    if ($event.target.checked) {
      this.formData[this.field.fieldID] = $event.target.value;
    } else {
      this.formData[this.field.fieldID] = undefined;
    }

    if (!!this.formData[this.field.fieldID])
      this.prepareDisplayValues();
  }

  isChecked(option: any) {
    return this.formData[this.field.fieldID] == (option.toString());
  }

  hasErrors() {
    let errors = false;
    if (this.field.required == 'true') {
      errors = this.formData[this.field.fieldID] == undefined;
    }

    return errors;
  }

  isRequired() {
    return this.service.isRequired(this.field.required, this.field.fieldID);
  }

  setDisplayValue(option: any) {
    this.formData[this.field.fieldID + '_displayValue'] = option && option.value.ar;
  }

  prepareDisplayValues() {
    let defaultOption = this.dataOptions.find(d => d.key == this.formData[this.field.fieldID]);
    if (!!defaultOption) {
      this.setDisplayValue(defaultOption);
    }
  }

  isActiveEditStep() {
    return this.service.isEditStep && (this.service.editStepField != this.field.fieldID);
  }
}
