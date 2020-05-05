import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { RowField } from '../field_order';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() fields: Field[];
  @Input() rowField: RowField;
  @Input() customClass: string;
  @Input() formData: string;
  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getField(field_id: string) {
    return this.service.findField(this.fields, field_id);
  }
}
