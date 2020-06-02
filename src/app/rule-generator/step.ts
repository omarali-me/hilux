export interface Step {
  dataIn?: any;
  dataDisplay?: any;
  commitData?: any;
}

export interface Steps {
  steps: Step[];
}