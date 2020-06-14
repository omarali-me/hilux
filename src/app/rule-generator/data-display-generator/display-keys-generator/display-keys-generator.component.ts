import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-display-keys-generator',
  templateUrl: './display-keys-generator.component.html',
  styleUrls: ['./display-keys-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DisplayKeysGeneratorComponent implements OnInit {
  dataType: string = 'field-data';
  dataOptions: any = [
                  {id: 'image', name: 'Image'},
                  {id: 'image-gallery', name: 'Image Gallery'},
                  {id: 'pdf', name: 'Pdf'},
                  {id: 'pdf-gallery', name: 'Pdf Gallery'},
                  {id: 'table', name: 'Table'},
                  {id: 'field-data', name: 'Field Data'},
                  {id: 'field-group', name: 'Field Group'},
                ]

  @Input() formData: any;
  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (this.formData[this.key]) {
      this.formData[this.key] = Object.assign({}, this.formData[this.key], this.blankDisplayData());
    }
  }

  deleteRow(deletekey) {
    _.unset(this.formData[this.key], deletekey);
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankDisplayData() {
    let data = {};
    if (this.dataType == 'image') {
      data[this.dataType] = { };
    } else if (this.dataType == 'image-gallery') {
      data[this.dataType] = [];
    } else if (this.dataType == 'pdf') {
      data[this.dataType] = { };
    } else if (this.dataType == 'pdf-gallery') {
      data[this.dataType] = [];
    } else if (this.dataType == 'table') {
      data[this.dataType] = { thead: {}, tbody: {}};
    } else if (this.dataType == 'field-data') {
      data[this.dataType] = { label: {}, value: {}};
    } else if (this.dataType == 'field-group') {
      data[this.dataType] = { fieldGroupName: {}, fields: [] };
    } else {
      data[this.dataType] = { };
    }

    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  deleteItemRow(deletekey) {
    _.unset(this.formData[this.key], deletekey);
  }

  hasKey(value: any, inclusion_key: string) {
    return Object.keys(value).includes(inclusion_key);
  }

}
