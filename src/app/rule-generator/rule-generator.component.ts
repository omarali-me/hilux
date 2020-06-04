import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { Steps } from './step';

@Component({
  selector: 'app-rule-generator',
  templateUrl: './rule-generator.component.html',
  styleUrls: ['./rule-generator.component.css']
})

export class RuleGeneratorComponent implements OnInit {
  formData: Steps = { steps: [this.blankStep()] };
  showResult: boolean = false;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData.steps.push(this.blankStep());
  }

  getrowId(row: any) {
    return `${row.row}`;
  }

  deleteRow(index) {
    _.remove(this.formData.steps, function(resource, i) {
        return index === i;
    });
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  saveData(formData) {
    this.showResult = true;
    console.log('data received is', formData);
  }

  blankStep() {
    return { statusName: { ar: "", en: "" } }
  }
}
