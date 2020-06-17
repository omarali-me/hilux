import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PageResponse } from '../fields/page_response';
import { RowField } from '../fields/field_order';
import { FieldsService } from '../shared/fields.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isArray } from 'util';

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
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
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
    console.log('form Data', this.prepareJson(formData));
    let form = new FormData();
    form.append('data', JSON.stringify(Object.assign({stepID: this.response.stepID, dataIn: this.prepareJson(formData)})));
    this.http.post('https://wfe.ajm.re/AjmanLandProperty/index.php/applications/completeStep', form)
      .subscribe((data: any)=> {
        if (data.status == 'success') {
          this.toastr.success(data.message, 'Success')
          this.router.navigate(['my_tasks']);
          // alert(data.message);
        } else {
          this.toastr.error(data.message, 'Error')
          // alert(data.message);
        }
      })
    // this.authenticationService.signin();
    // this.router.navigate(['/']);
  }

  private prepareJson(formData: any) {
    let preparedData = {}
    const rows = Object.values(formData);
    for(let row of rows) {
      if (this.isEnumerator(row)) {
        const rowData = this.prepareArrayObject(row);
        preparedData = Object.assign({}, preparedData, rowData);
      } else {
        preparedData = Object.assign({}, preparedData, row);
      }
    }
    return preparedData
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  private prepareArrayObject(row: any) {
    let nestedObj = {};
    const keys = _.uniq(_.flatMap(row, (o) => _.keys(o)));

    for(let key of keys) {
      nestedObj[key] = _.map(row, (o) => o[key]).filter(o => o);
    }

    return nestedObj
  }
}
