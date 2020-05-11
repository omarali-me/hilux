import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';

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

  @Input() index: any = 0;

  constructor() { }

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

  getmedate(event: any) {
    console.log('date set is', event)
  }

  hello() {
    console.log('changed');
  }
}
