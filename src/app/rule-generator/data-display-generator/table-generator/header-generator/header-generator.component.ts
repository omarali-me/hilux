import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { isArray } from 'util';

@Component({
  selector: 'app-header-generator',
  templateUrl: './header-generator.component.html',
  styleUrls: ['./header-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class HeaderGeneratorComponent implements OnInit {

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
    let data = {};
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
