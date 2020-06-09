import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { isArray } from 'util';

@Component({
  selector: 'app-or-predicate-generator',
  templateUrl: './or-predicate-generator.component.html',
  styleUrls: ['./or-predicate-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class OrPredicateGeneratorComponent implements OnInit {
  predicateType: string = 'condition';

  dataOptions: any = [
    {id: 'condition', name: 'Condition'},
    {id: 'or', name: 'Or'},
    {id: 'and', name: 'And'}
  ]

  typeOptions: any = [
    {id: 'in', name: 'in'},
    {id: '=', name: '='},
    {id: '!=', name: '!='},
    {id: '<', name: '<'},
    {id: '<=', name: '<='},
    {id: '>', name: '>'},
    {id: '>=', name: '>='},
    {id: 'like', name: 'like'}
  ]

  @Input() formData: any;
  
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    // if (this.formData.value) {
    //   this.formData = Object.assign({}, this.formData, this.blankPredicateData());
    // }

    if (this.formData.value) {
      if (!this.isEnumerator(this.formData.value)) {
        this.formData.value = [this.formData.value];
      }
  
      this.formData.value.push(this.blankPredicateData());
    } else {
      this.formData.value = this.blankPredicateData();
    }
  }

  deleteRow(index) {
    _.remove(this.formData.value, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankPredicateData() {
    let data = {};
    if (this.predicateType == 'condition') {
      data = Object.assign({}, data, { condition: { type: '=', data: {} } })
    } else if(this.predicateType == 'and') {
      data = Object.assign({}, data, { and: [] })
    } else {
      data = Object.assign({}, data, { or: [] })
    }

    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  deleteItemRow() {

  }
}
