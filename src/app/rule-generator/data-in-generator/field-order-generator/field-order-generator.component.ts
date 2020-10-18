import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-field-order-generator',
  templateUrl: './field-order-generator.component.html',
  styleUrls: ['./field-order-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldOrderGeneratorComponent implements OnInit {

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData.fieldOrder.push(this.blankRow());
  }

  deleteRow(index) {
    _.remove(this.formData.fieldOrder, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankRow() {
    let data = { rowFields: [] };
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
