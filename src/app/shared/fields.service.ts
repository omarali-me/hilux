import { Injectable } from '@angular/core';
import { Field } from '../fields/fields';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class FieldsService {

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
}

