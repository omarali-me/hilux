import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-image-gallery-generator',
  templateUrl: './image-gallery-generator.component.html',
  styleUrls: ['./image-gallery-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ImageGalleryGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData[this.key].push(this.blankField());
  }

  deleteRow(index) {
    _.remove(this.formData[this.key], function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankField() {
    let data = {};
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
