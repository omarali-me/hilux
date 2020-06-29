import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from 'src/app/shared/fields.service';
import { Field } from 'src/app/fields/fields';
import { RowField } from 'src/app/fields/field_order';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  @Input() fields: Field[];
  @Input() rowField: RowField;
  @Input() customClass: string;
  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getField(field_id: string) {
    return this.service.findField(this.fields, field_id);
  }

  showRequired(field_id: string) {
    const field = this.getField(field_id);
    return (field && (field.required == 'true'));
  }

  notHiddenField(field_id: string) {
    const field = this.getField(field_id);
    return (field && (field.fieldType !== 'hidden'));
  }
}
