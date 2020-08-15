import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class CurrencyFieldComponent implements OnInit {

  constructor(private service: FieldsService) { }

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;
  
  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;

  @Input() formErrors: any;

  @Input() defaultValues: any;

  ngOnInit(): void {
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
  }

  isRequired() {
    return this.service.isRequired(this.field.required);
  }
}
