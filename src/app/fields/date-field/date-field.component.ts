import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from 'src/app/shared/fields.service';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DateFieldComponent implements OnInit {

  @Input() field: Field;

  @Input() customClass: string = 'test';

  @Input() formData: any;

  @Input() row: any;
  
  @Input() index: any = 0;

  @Input() fullFormData: any;

  @Input() formErrors: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getControlClass() {
    switch (this.field.auxInfo.type.toLowerCase()) {
      case 'date-range':
        return 'date-range-picker';
      case 'date-time':
        return 'date-time-picker';
      case 'time':
          return 'time-picker';
      default:
        return 'datepicker';
    }
  }

  getTargetname(field_name: string) {
    return `#${field_name}`;
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
