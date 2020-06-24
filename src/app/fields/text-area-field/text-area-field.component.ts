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

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;

  @Input() formErrors: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
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
}
