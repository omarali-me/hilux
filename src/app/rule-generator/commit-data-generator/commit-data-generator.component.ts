import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { isArray } from 'util';
import { Step } from '../step';

@Component({
  selector: 'app-commit-data-generator',
  templateUrl: './commit-data-generator.component.html',
  styleUrls: ['./commit-data-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class CommitDataGeneratorComponent implements OnInit {
  commitType: string = 'commit';
  dataOptions: any = [
                  {id: 'commit', name: 'Commit'},
                  {id: 'insert', name: 'Insert'},
                  {id: 'update', name: 'Update'},
                  {id: 'delete', name: 'Delete'},
                ]

  @Input() formData: Step;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    if (this.formData.commitData) {
      if (!this.isEnumerator(this.formData.commitData)) {
        this.formData.commitData = [this.formData.commitData];
      }
  
      this.formData.commitData.push(this.blankCommitData());
    } else {
      this.formData.commitData = this.blankCommitData();
    }
  }

  deleteRow(index) {
    _.remove(this.formData.commitData, function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData.commitData) && this.formData.commitData?.length == 1) {
      this.formData.commitData = this.formData.commitData[0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankCommitData() {
    let data = {};
    data[this.commitType] = {}
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}
