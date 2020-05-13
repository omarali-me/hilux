import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RESPONSE_DATA } from '../shared/data';
import { FieldsService } from '../shared/fields.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { RowField } from '../fields/field_order';
import * as _ from 'lodash';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})

export class CustomPageComponent implements OnInit {
  response: any;
  formData: any = {};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fieldsService: FieldsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.response = RESPONSE_DATA;
  }

  login(formData: any) {
    console.log('formData received is', formData);
    this.authenticationService.signin();
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticationService.signout();
  };

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

  getsubrowId(subRow) {
    // return `${subRow.row}`;
  }

  deleteRow(row, index) {
    _.remove(this.formData[row.row], function(resource, i) {
        return index === i;
    });
  }


  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

}
