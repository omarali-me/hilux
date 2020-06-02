import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CommitData } from '../../step';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-values-generator',
  templateUrl: './values-generator.component.html',
  styleUrls: ['./values-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ValuesGeneratorComponent implements OnInit {

  @Input() formData: CommitData;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (!this.isEnumerator(this.formData.values)) {
      this.formData.values = [this.formData.values];
    }

    this.formData.values.push(this.blankValues());
  }


  deleteRow(index) {
    _.remove(this.formData.values, function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData.values) && this.formData.values?.length == 1) {
      this.formData.values = this.formData.values[0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankValues() {
    return { }
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

}
