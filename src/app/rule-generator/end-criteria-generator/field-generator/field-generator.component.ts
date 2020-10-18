import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldGeneratorComponent implements OnInit {criteriaType: string = 'dataValidation';

  dataOptions: any = [
    {id: 'stepsDataLogic', name: 'Steps Data Logic'}
  ]
  seq: number = 0;

  @Input() key: string;
  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.seq += 1;
    if (this.formData[this.key]) {
      this.formData[this.key] = Object.assign({}, this.formData[this.key], this.blankPredicateData());
    }
  }

  deleteRow(deletekey) {
    _.unset(this.formData[this.key], deletekey);
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankPredicateData() {
    let data = { };

    data[this.getKey()] = { errorMessage: {}, criteria: {} }
    return data;
  }

  getKey() {
    return 'field' + (this.seq);
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  nonsort() {
    return 0
  }

}