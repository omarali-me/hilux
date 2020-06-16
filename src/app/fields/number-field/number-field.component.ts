import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class NumberFieldComponent implements OnInit {

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }
}
