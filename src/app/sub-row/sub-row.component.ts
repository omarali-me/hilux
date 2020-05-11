import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields/fields';
import { RowField } from '../fields/field_order';
import { FieldsService } from '../shared/fields.service';

@Component({
  selector: 'app-sub-row',
  templateUrl: './sub-row.component.html',
  styleUrls: ['./sub-row.component.css']
})
export class SubRowComponent implements OnInit {

  @Input() fields: Field[];
  @Input() rowField: RowField;
  @Input() customClass: string;
  @Input() formData: any;
  @Input() row: any;
  @Input() index: number = 0;

  constructor(private fieldsService: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, field: RowField) {
    return classname + this.fieldsService.getFieldWidth(field.fieldWidth)
  }

  getrowId(row: any) {
    return `${row}`;
  }
}
