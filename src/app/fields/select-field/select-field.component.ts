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

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    this.service.getFieldData(this.field).subscribe((data)=> {
      this.dataOptions = [
        {
          "key": "commercial",
          "value": {
            "ar": "تجاري",
            "en": "Commercial"
          }
        },
        {
          "key": "residential",
          "value": {
            "ar": "سكني",
            "en": "Residential"
          }
        }
      ];
    })
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  setmyvalue(value: any) {
    console.log('value changed',value);
  }

}
