import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CommitData } from '../../step';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-values-generator',
  templateUrl: './values-generator.component.html',
  styleUrls: ['./values-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ValuesGeneratorComponent implements OnInit {
  valueType: string = 'value';
  dataOptions: any = [
    {id: 'function_params', name: 'Function + Params'},
    {id: 'step_field', name: 'Step + Field'},
    {id: 'value', name: 'Value'}
  ]

  @Input() formData: CommitData;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (this.formData.values) {
      if (!this.isEnumerator(this.formData.values)) {
        console.log('here in sife the add row', this.formData.values);
        this.formData.values = [this.formData.values];
      }

      this.formData.values.push(this.blankValues());
    } else {
      this.formData.values = this.blankValues();
    }
  }

  deleteRow(index) {
    _.remove(this.formData.values, function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData.values) && this.formData.values?.length == 1) {
      this.formData.values = this.formData.values[0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankValues() {
    let data = { column: null };
    if (this.valueType == 'function_params') {
      data = Object.assign({}, data, { phpFunction: null, params: null})
    } else if (this.valueType == 'step_field') {
      data = Object.assign({}, data, { fieldID: null, step: null})
    } else {
      data = Object.assign({}, data, { value: null})
    }

    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  hasKey(value: any, inclusion_key: string) {
    return Object.keys(value).includes(inclusion_key);
  }
}
