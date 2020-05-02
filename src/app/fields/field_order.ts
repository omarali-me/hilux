
export interface FieldOrder {
  row: string;
  allowMultiple?: string;
  rowFields: RowField[];
}

export interface RowField {
  fieldID: string;
  fieldWidth: string;
}
