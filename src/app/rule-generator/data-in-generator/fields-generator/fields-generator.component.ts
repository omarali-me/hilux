import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-fields-generator',
  templateUrl: './fields-generator.component.html',
  styleUrls: ['./fields-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldsGeneratorComponent implements OnInit {
  dataOptions: any = [
    {id: 'text', name: 'Text'},
    {id: 'currency', name: 'Currency'},
    {id: 'radio', name: 'Radio'},
    {id: 'checkbox', name: 'Checkbox'},
    {id: 'number', name: 'Number'},
    {id: 'dropdown', name: 'Dropdown'},
    {id: 'textarea', name: 'Textarea'},
    {id: 'date', name: 'Date'},
    {id: 'entitySelect', name: 'Entity Select'},
    {id: 'stepSelect', name: 'Step Select'},
    {id: 'ajaxButton', name: 'Ajax Button'}
  ]

  sourceTypeOptions:any = [
    {id: 'api', name: 'API'},
    {id: 'list', name: 'List'},
  ]

  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    this.formData.fields.push(this.blankField());
  }

  deleteRow(index) {
    _.remove(this.formData.fields, function(resource, i) {
        return index === i;
    });
  }

  ngAfterContentInit () {
    this.changeDetector.detectChanges();
  }

  blankField() {
    let data = {  fieldType: "text",
                  fieldName: {},
                  placeholder: {},
                  errorMsg: {},
                  auxInfo: { source: 'api' }
                };
    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }
}


// {
//   "fieldID": "projectCompletionDate",
//   "fieldType": "currency",
//   "required": "true",
//   "fieldName": {
//     "ar": "Project completion date",
//     "en": "Project completion date"
//   },
//   "placeholder": {
//     "ar": "",
//     "en": ""
//   },
//   "errorMsg": {
//     "ar": "",
//     "en": ""
//   },
//   "auxInfo": {
//     "acceptedFileTypes": "",
//     "minLength": "",
//     "maxLength": "",
//     "type": "Date",
//     "source": "api",
//     "sourceDetails": "it/getAllEmployees"
//   }
// }