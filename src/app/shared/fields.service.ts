import { Injectable } from '@angular/core';
import { Field } from '../fields/fields';

@Injectable()
export class FieldsService {

  constructor() {}

  findField(fields: Field[], field_id: string): Field {
    return fields.find(f => f.fieldID === field_id);
  }

  getFieldWidth(grid_size: string): number {
    return this.textToNumber(grid_size);
  }

  getModelName(field_id: string, formdata: any ) {
    return `${formdata}.${field_id}`
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
}

