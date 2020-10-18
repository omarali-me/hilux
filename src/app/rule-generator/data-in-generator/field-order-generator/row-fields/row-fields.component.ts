import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-row-fields',
  templateUrl: './row-fields.component.html',
  styleUrls: ['./row-fields.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class RowFieldsComponent implements OnInit {
  dataOptions: any = [
    {id: 'one', name: 'One'},
    {id: 'two', name: 'Two'},
    {id: 'three', name: 'Three'},
    {id: 'four', name: 'Four'},
    {id: 'five', name: 'Five'},
    {id: 'six', name: 'Six'},
    {id: 'seven', name: 'Seven'},
    {id: 'eight', name: 'Eight'},
    {id: 'nine', name: 'Nine'},
    {id: 'ten', name: 'Ten'},
    {id: 'eleven', name: 'Eleven'},
    {id: 'twelve', name: 'Twelve'},
  ]

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData.rowFields.push(this.blankRow());
  }

  deleteRow(index) {
    _.remove(this.formData.rowFields, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankRow() {
    let data = { fieldWidth: "twelve" };
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
