import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class TextAreaFieldComponent implements OnInit {

  isEditRemarks: boolean = false;
  isRejectRemarks: boolean = false;

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
    this.isEditRemarks = (this.field.fieldID == 'editRemarks');
    this.isRejectRemarks = (this.field.fieldID == 'rejectRemarks');
    this.getDefaultValue(this.field.fieldID);
  }

  getText(field: any, key: string) {
    return  this.service.getText(field, key);
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index)
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, this.index);
    if (this.isEditRemarks) {
      this.service.setEditRemarksField(field_name);
    }

    if (this.isRejectRemarks) {
      this.service.setRejectRemarksField(field_name);
    }
  }

  isRequired() {
    return this.service.isRequired(this.field.required, this.field.fieldID);
  }

  isActiveEditStep() {
    return this.isEditRemarks ? false : this.service.isEditStep && this.service.editStepField != this.field.fieldID;
  }

  isActiveRejectStep() {
    return this.isRejectRemarks ? false : (this.service.isRejectStep && this.service.rejectRemarksField != this.field.fieldID);
  }
}
