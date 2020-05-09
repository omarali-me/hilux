import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from './field-base';

@Injectable()
export class FieldControlService {
  constructor() { }

  toFormGroup(fields: FieldBase<string>[] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.fieldID] = field.required ? new FormControl(field.value || '', Validators.required)
                                              : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}
