import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-body-generator',
  templateUrl: './body-generator.component.html',
  styleUrls: ['./body-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class BodyGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData[this.key].push(this.blankHead());
  }

  deleteRow(index) {
    _.remove(this.formData[this.key], function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankHead() {
    const length = this.formData.thead.length

    let data = [];
    for (let step = 0; step < length; step++) {
      data.push({});
    }
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
