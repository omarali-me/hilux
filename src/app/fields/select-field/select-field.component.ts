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

  @Input() index: any = 0;

  @Input() fullFormData: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    this.dataOptions = this.service.getFieldData(this.field, this.fullFormData);
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
}
