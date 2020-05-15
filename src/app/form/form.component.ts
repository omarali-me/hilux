import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PageResponse } from '../fields/page_response';
import { RowField } from '../fields/field_order';
import { FieldsService } from '../shared/fields.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: any = {};

  @Input() response: PageResponse;

  constructor(
    private fieldsService: FieldsService,
    private changeDetector: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getClass(classname: string, field: RowField) {
    return classname + this.fieldsService.getFieldWidth(field.fieldWidth)
  }

  getFormDatafor(row: any, index?: any) {
    if (row.allowMultiple) {
      this.formData[row.row] ? this.formData[row.row] : (this.formData[row.row] = [{}])
    } else {
      this.formData[row.row] ? this.formData[row.row] : (this.formData[row.row] = {})
    }
    return this.formData[row.row];
  }

  addRow(row, index) {
    console.log('add row', row);
    this.formData[row.row].push({});
  }

  getrowId(row: any) {
    return `${row.row}`;
  }

  deleteRow(row, index) {
    _.remove(this.formData[row.row], function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  saveData(formData : any) {
    console.log('formData received is', formData);
    this.authenticationService.signin();
    this.router.navigate(['/']);
  }
}
