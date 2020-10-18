import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { isArray } from 'util';

@Component({
  selector: 'app-start-criteria-generator',
  templateUrl: './start-criteria-generator.component.html',
  styleUrls: ['./start-criteria-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class StartCriteriaGeneratorComponent implements OnInit {
  criteriaType: string = 'stepsDataLogic';

  dataOptions: any = [
    {id: 'stepsDataLogic', name: 'Steps Data Logic'}
  ]

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankCriteriaData() {
    let data = {};
    data[this.criteriaType] = null
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  addRow(){

  }

  deleteRow(index: any) {
    
  }

}
