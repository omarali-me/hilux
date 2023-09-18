import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import * as _ from 'lodash';
import { ControlContainer, NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class CheckboxFieldComponent implements OnInit {
  dataOptions: any;
  isEditStep: boolean = false;
  isRejectStep: boolean = false;

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;
  
  @Input() formErrors: any;

  @Input() defaultValues: any;

  constructor(private service: FieldsService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isEditStep = (this.field.fieldID == 'editStep');
    this.isRejectStep = (this.field.fieldID == 'rejectStep');
    this.service.getFieldData(this.field, this.fullFormData).subscribe((data)=> {
      this.dataOptions = data;
      this.getDefaultValue(this.field.fieldID);
    })
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  handleChange($event) {
    if (!this.formData[this.field.fieldID])
      this.formData[this.field.fieldID] = [];

    if ($event.target.checked) {
      this.formData[this.field.fieldID].push($event.target.value);
    } else {
      _.remove(this.formData[this.field.fieldID], i => i === $event.target.value);
      if (this.formData[this.field.fieldID].length == 0) {
        this.formData[this.field.fieldID] = undefined;
      }
    }
    
    this.prepareDisplayValues();
    if (this.isEditStep) {
      this.service.setIsEditStep($event.target.checked);
    }

    if (this.isRejectStep) {
      this.service.setIsRejectStep($event.target.checked);
    }
  }

  optionSelected(val: any) {
    return this.formData[this.field.fieldID] && this.formData[this.field.fieldID].includes(val);
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, (this.index || 0));
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  isChecked(option: any) {
    return this.formData[this.field.fieldID] && this.formData[this.field.fieldID].includes(option.toString());
  }

  hasErrors() {
    let errors = false;
    if (this.field.required == 'true') {
      errors = this.formData[this.field.fieldID] == undefined;
    }

    return errors;
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index);
  }

  isRequired() {
    return this.service.isRequired(this.field.required, this.field.fieldID);
  }

  setDisplayValue(option: any) {
    this.formData[this.field.fieldID + '_displayValue'] = (option.length ? option.map(o => o.value && o.value.ar).filter(r => r) : []);
  }

  prepareDisplayValues() {
    let defaultOption = [];
    if (!!this.formData[this.field.fieldID]) {
      this.formData[this.field.fieldID].forEach(element => {
        defaultOption.push(this.dataOptions.find(d => d.key == element));
      });
      defaultOption = defaultOption.filter(r => r);
      if (defaultOption.length) {
        this.setDisplayValue(defaultOption);
      }
    } else {
      this.formData[this.field.fieldID + '_displayValue'] = [];
    }
  }

  isActiveEditStep() {
    return this.isEditStep ? false : (this.service.isEditStep && (this.service.editStepField != this.field.fieldID || this.service.editRemarksField != this.field.fieldID));
  }

  isActiveRejectStep() {
    return this.isRejectStep ? false : (this.service.isRejectStep && (this.service.rejectReasonField != this.field.fieldID || this.service.rejectRemarksField != this.field.fieldID));
  }
}
