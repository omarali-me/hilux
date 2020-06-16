import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class CurrencyFieldComponent implements OnInit {

  constructor(private service: FieldsService) { }

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;
  
  @Input() index: any = 0;

  @Input() fullFormData: any;

  ngOnInit(): void {
  }

  getText(field: any, key: string) {
    return  this.service.getText(field, key);
  }
}
