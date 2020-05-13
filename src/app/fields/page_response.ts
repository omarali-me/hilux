import { Field } from './fields';
import { FieldOrder } from './field_order';

export interface PageResponse {
  displayData: any[];
  fields: Field[];
  fieldOrder: FieldOrder[];
}
