import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-value-generator',
  templateUrl: './value-generator.component.html',
  styleUrls: ['./value-generator.component.css']
})
export class ValueGeneratorComponent implements OnInit {
  valueType: string = 'value';
  dataOptions: any = [
    {id: 'function_params', name: 'Function + Params'},
    {id: 'step_field', name: 'Step + Field'},
    {id: 'value', name: 'Value'}
  ]

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (this.formData.data.value) {
      if (!this.isEnumerator(this.formData.data.value)) {
        this.formData.data.value = [this.formData.data.value];
      }

      this.formData.data.value.push(this.blankValue());
    } else {
      this.formData.data.value = this.blankValue();
    }
  }

  deleteRow(index) {
    _.remove(this.formData.data.value, function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData.data.value) && this.formData.data.value?.length == 1) {
      this.formData.data.value = this.formData.data.value[0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankValue() {
    let data = { };
    if (this.formData.data.type == 'in') {
      data = []
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
