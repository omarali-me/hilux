import { FieldName } from 'src/app/fields/fields';

export interface Notification {
  applicationWorkflowStepID: string;
  applicationID: string;
  stepNumber: string;
  stepStatus: FieldName;
  timeStampInEffect: string;
  status: string;
}