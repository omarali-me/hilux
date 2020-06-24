import { Injectable } from '@angular/core';
import { Field } from '../fields/fields';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class FieldsService {

  menuItems$: Observable<any>;

  constructor(private http: HttpClient) {}

  findField(fields: Field[], field_id: string): Field {
    return fields.find(f => f.fieldID === field_id);
  }

  getFieldWidth(grid_size: string): number {
    return this.textToNumber(grid_size);
  }

  getModelName(field_id: string, formdata: any ) {
    return `${formdata}.${field_id}`
  }

  getFieldData(field: Field, formData:any = {}, params: any = {}) {
    if (field.auxInfo.source == 'api') {
      let preparedparams = this.prepaareParams(formData, field.auxInfo.apiParams)
      let finalParams = Object.assign({}, preparedparams, params);
      let apiUrl: string = field.auxInfo.sourceDetails
      if (field.auxInfo && field.auxInfo.method && field.auxInfo.method == 'post')
        return this.postData(apiUrl, finalParams);
      return this.getUrl(apiUrl, finalParams);
    } else if (field.auxInfo.source == 'list') {
      return of(field.auxInfo.sourceDetails);
    } else {
      of([]);
    }
  }

  private textToNumber(grid_size: string): number {
    switch (grid_size.toLowerCase()) {
      case 'one':
        return 1;
      case 'two':
        return 2;
      case 'three':
        return 3;
      case 'four':
        return 4;
      case 'five':
        return 5;
      case 'six':
        return 6;
      case 'seven':
        return 7;
      case 'eight':
        return 8;
      case 'nine':
        return 9;
      case 'ten':
        return 10;
      case 'eleven':
        return 11;
      default:
        return 12;
    }
  }

  private prepaareParams(formData: any, apiParams: any) {
    let params = {};
    if (apiParams) {
      apiParams.forEach(param => {
        Object.keys(formData).forEach( key => {
          if (Array.isArray(formData[key])) {
            formData[key].forEach(element => {
              if (element.hasOwnProperty(param)) {
                params[param] = element[param];
              }
            })
          } else {
            if(formData[key].hasOwnProperty(param)) {
              params[param] = formData[key][param];
            }
          }
        });
      });
    }
    return params;
  }

  getUrl(url: string, params: any = {}) {
    return this.http.get<any>(url, {params: params});
  }

  getText(field: any, key: string) {
    return  ((field[key] && field[key].en) || '');
  }

  postData(url: string, params: any = {}) {
    let form = new FormData();
    form.append('data', JSON.stringify(params));
    return this.http.post<any>(url, form);
  }

  getFieldName(field_name: string, row: string, index: string) {
    return `${row}_${field_name}_${index}`
  }

  getMenuItems() {
    this.menuItems$ = this.menuItems$ || this.http.get<any>('http://localhost:3000/menu')
    return this.menuItems$;
  }

  getErrors(field_name: any, errors: any[]) {
    let error: any = {};
    if (errors && (errors.length > 0)) {
      for(let err of errors) {
        if (_.has(err, field_name)) {
          error = err[field_name];
          break;
        };
      }
      return error.en;
    }
  }

  showErrors(field_name: any, errors: any[]) {
    let found
    if (errors && (errors.length > 0)) {
      for(let err of errors) {
        if (_.includes(_.keys(err), field_name)) {
          found = true;
          break;
        };
      }
      return found;
    } else {
      return false;
    }
  }
}

