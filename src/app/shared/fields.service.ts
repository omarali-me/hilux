import { Injectable, EventEmitter } from '@angular/core';
import { Field } from '../fields/fields';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { isArray } from 'util';

@Injectable()
export class FieldsService {

  menuItems: any = {};

  public fieldValueChanged$ = new EventEmitter<any>();

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
      let preparedparams = this.prepareParams(formData, field.auxInfo.apiParams)
      let finalParams = Object.assign({}, preparedparams, params);
      let apiUrl: string = field.auxInfo.sourceDetails
      if (field.auxInfo && field.auxInfo.method && field.auxInfo.method == 'post')
        return this.postData(apiUrl, finalParams);
      return this.getUrl(apiUrl, finalParams);
    } else if (field.auxInfo.source == 'list') {
      return of(field.auxInfo.sourceDetails);
    } else if (field.auxInfo.source = 'fieldValues') {
      return this.prepareOptionsForField(formData, field.auxInfo.sourceDetails)
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

  private prepareParams(formData: any, apiParams: any) {
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
    return  ((field[key] && field[key].ar) || '');
  }

  postData(url: string, params: any = {}) {
    let form = new FormData();
    form.append('data', JSON.stringify(params));
    return this.http.post<any>(url, form);
  }

  getFieldName(field_name: string, row: string, index: string) {
    return `${row}_${field_name}_${index}`
  }

  async getMenuItems() {
    if (_.size(this.menuItems) > 0) {
      return this.menuItems
    } else {
      return this.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices`)
      .subscribe((data) => {
        this.menuItems
      })
      return this.menuItems
    }
  }

  getErrors(field_name: any, errors: any) {
    let error: any = {};
    // if (errors && (errors.length > 0)) {
    //   for(let err of errors) {
        if (_.has(errors, field_name)) {
          error = errors[field_name];
          // break;
        };
      // }
      return error.ar;
    // }
  }

  showErrors(field_name: any, errors: any) {
    let found = false;
    // if (errors && (errors.length > 0)) {
    //   for(let err of errors) {
        if (_.includes(_.keys(errors), field_name)) {
          found = true;
          // break;
        };
    //   }
    // }

    return found;
  }

  getDefaultValue(field_name: any, defaultValues: any, index?: any) {
    const defaultValue = _.find(defaultValues, (o) => { return o.fieldID == field_name });
    if (defaultValue) {
      return this.defaultValuesByIndex(defaultValue.defaultValue, index)
    } else {
      return defaultValue;
    }
  }

  private defaultValuesByIndex(value: any, index?: any) {
    if (isArray(value)) {
      return value[index];
    } else {
      return value
    }
  }

  private prepareOptionsForField(formData: any, source: any) {
    let options = []
    if (source) {
      _.keys(formData).forEach( key => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(element => {
            if (element.hasOwnProperty(source)) {
              if (element[source])
                options.push(this.prepareObj(element, source));
            }
          })
        }
      });
    }

    return of(options);
  }

  private prepareObj(element, source) {
    return { key: element[source],
      value: { "ar": element[source] }
    }
  }
}
