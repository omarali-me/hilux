import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-step-select',
  templateUrl: './step-select.component.html',
  styleUrls: ['./step-select.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class StepSelectComponent implements OnInit {
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
    this.formData[this.field.fieldID] = {};
    this.service.getFieldData(this.field, this.fullFormData).subscribe((data)=> {
      this.dataOptions = data;
      this.getDefaultValue(this.field.fieldID);
    })
  }

  getFieldName(name: string, index: any) {
    return this.service.getFieldName(name, this.row, this.index) + `_${index}`;
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, this.index);
  }

  getValue(value: any) {
    return value.toString();
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  hasErrors() {
    let errors = false;
    if (this.field.required == 'true') {
      errors = this.formData[this.field.fieldID] == undefined;
    }

    return errors;
  }

  handleChange($event) {
    if (!this.formData[this.field.fieldID])
      this.formData[this.field.fieldID] = undefined;

    if ($event.target.checked) {
      this.formData[this.field.fieldID] = $event.target.value;
    } else {
      this.formData[this.field.fieldID] = undefined;
    }
  }

  isChecked(option: any) {
    return this.formData[this.field.fieldID] == (option.toString());
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index);
  }

  isRequired() {
    return this.service.isRequired(this.field.required, this.field.fieldID);
  }

  isActiveEditStep() {
    return this.service.isEditStep && (this.service.editStepField != this.field.fieldID);
  }

  isActiveRejectStep() {
    return this.service.isRejectStep && (this.service.rejectReasonField != this.field.fieldID);
  }
}
