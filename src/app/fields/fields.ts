export interface Field {
  fieldID: string;
  fieldType: string;
  required: string;
  fieldName: FieldName;
  placeholder: Placeholder
  errorMsg: ErrorMessage;
  auxInfo: AuxInfo;
}

export interface AuxInfo {
  acceptedFileTypes: string;
  minLength: string;
  maxLength: string;
  method?: string;
  autocomplete?: string;
  type: string;
  source: string;
  apiParams?: string[];
  sourceDetails:  any;
}

export interface FieldName {
  ar: string;
  en: string;
}

export interface SourceSuppliedData {
  key: string,
  value: FieldName;
}

export interface ErrorMessage extends FieldName {}

export interface Placeholder extends ErrorMessage {}
