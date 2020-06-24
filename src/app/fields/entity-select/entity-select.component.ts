import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class EntitySelectComponent implements OnInit {
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
    this.formData[this.field.fieldID] = {};
    this.service.getFieldData(this.field).subscribe((data)=> {
      this.dataOptions = data;
    })
  }

  getFieldName(name: string, index: any) {
    return this.service.getFieldName(name, this.row, this.index) + `_${index}`;
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }
}
