export interface Step {
  stepName?: any,
  statusName: { "ar": string, "en": string },
  isStart?: boolean,
  isLast?: boolean,
  isAPIstep?: boolean,
  dataIn?: any;
  dataDisplay?: any;
  commitData?: any;
}

export interface Steps {
  steps: Step[];
}

export interface CommitData {
  commit: string;
  commitID: string | number;
  multiple: boolean;
  entity: string;
  values: any;
}