import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { RowField } from '../field_order';
import { FieldsService } from '../../shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldComponent implements OnInit {

  @Input() fields: Field[];
  @Input() rowField: RowField;
  @Input() customClass: string;
  @Input() formData: string;
  @Input() row: string;
  @Input() index: string;
  @Input() fullFormData: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getField(field_id: string) {
    return this.service.findField(this.fields, field_id);
  }

}
