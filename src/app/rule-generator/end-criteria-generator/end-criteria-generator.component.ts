import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';

@Component({
  selector: 'app-end-criteria-generator',
  templateUrl: './end-criteria-generator.component.html',
  styleUrls: ['./end-criteria-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class EndCriteriaGeneratorComponent implements OnInit {
  criteriaType: string = 'dataValidation';

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