import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-display-generator',
  templateUrl: './data-display-generator.component.html',
  styleUrls: ['./data-display-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DataDisplayGeneratorComponent implements OnInit {
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

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (this.formData.displayData) {
      if (!this.isEnumerator(this.formData.displayData)) {
        this.formData.displayData = [this.formData.displayData];
      }
  
      this.formData.displayData.push(this.blankDisplayData());
    } else {
      this.formData.displayData = this.blankDisplayData();
    }
  }

  deleteRow(index) {
    console.log('; up here', this.formData.displayData)
    _.remove(this.formData.displayData, function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData.displayData) && this.formData.displayData?.length == 1) {
      this.formData.displayData = this.formData.displayData[0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankDisplayData() {
    let data = {};
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

}