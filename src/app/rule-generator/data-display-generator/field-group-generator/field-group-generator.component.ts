import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-field-group-generator',
  templateUrl: './field-group-generator.component.html',
  styleUrls: ['./field-group-generator.component.css']
})
export class FieldGroupGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData[this.key].fields.push(this.blankField());
  }

  deleteRow(index) {
    _.remove(this.formData[this.key].fields, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankField() {
    let data = { label: {}, value: {}};
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
