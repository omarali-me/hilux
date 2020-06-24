import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class SelectFieldComponent implements OnInit {
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
    this.loadData();
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  setmyvalue(value: any) {
    console.log('value changed',value);
  }

  getText(field: any, key: string) {
    return  this.service.getText(field, key);
  }

  loadData() {
    this.dataOptions = this.service.getFieldData(this.field, this.fullFormData);
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
}
