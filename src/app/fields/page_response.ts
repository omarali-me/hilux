import { Field } from './fields';
import { FieldOrder } from './field_order';

export interface PageResponse {
  fields: Field[];
  fieldOrder: FieldOrder[];
}
