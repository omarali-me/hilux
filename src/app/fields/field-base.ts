import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { FieldName, AuxInfo, ErrorMessage } from './fields';

export class FieldBase<T> {
  value: T;
  fieldID: string;
  fieldType: string;
  required: boolean;
  fieldName: FieldName;
  placeholder: Placeholder
  errorMsg: ErrorMessage;
  auxInfo: AuxInfo;


  
  constructor(options: {
      value?: T,
      fieldID?: string,
      fieldType?: string,
      required?: boolean,
      fieldName?: FieldName,
      placeholder?: Placeholder,
      errorMsg?: ErrorMessage,
      auxInfo?: AuxInfo
    } = {}) {

    this.value = options.value;
    this.fieldID = options.fieldID;
    this.fieldType = options.fieldType;
    this.required = !!options.required;
    this.fieldName = options.fieldName;
    this.errorMsg = options.errorMsg;
    this.auxInfo = options.auxInfo;
  }
}
