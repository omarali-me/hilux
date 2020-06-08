import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown-values',
  templateUrl: './dropdown-values.component.html',
  styleUrls: ['./dropdown-values.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DropdownValuesComponent implements OnInit {
  staticValues: boolean = false;

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData.sourceDetails = (this.formData.sourceDetails || []);
    this.formData.sourceDetails.push(this.blankField());
  }

  deleteRow(index) {
    _.remove(this.formData.sourceDetails, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankField() {
    return (this.formData.source == 'list') ? { value: {} } : null;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

}