import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import * as _ from 'lodash';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class CheckboxFieldComponent implements OnInit {
  dataOptions: any;

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;
  
  @Input() formErrors: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    this.formData[this.field.fieldID] = {};
    this.service.getFieldData(this.field, this.fullFormData).subscribe((data)=> {
      this.dataOptions = data;
    })
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  handleChange($event) {
    if (!this.formData[this.field.fieldID])
      this.formData[this.field.fieldID] = [];

    if ($event.target.checked)
      this.formData[this.field.fieldID].push($event.target.value);
      
    else
      _.remove(this.formData[this.field.fieldID], i => i === $event.target.value);
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
}
