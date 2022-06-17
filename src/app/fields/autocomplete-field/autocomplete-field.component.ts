import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';
import { FieldsService } from 'src/app/shared/fields.service';
import { Observable, Subject, concat, of } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';



@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AutocompleteFieldComponent implements OnInit {
  dataOptions: Observable<any>;
  dataOptionsLoading = false;
  searchInput$ = new Subject<string>();

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() index: any = 0;

  @Input() row: any;

  @Input() fullFormData: any;
  
  @Input() formErrors: any;

  @Input() defaultValues: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    // this.dataOptions = this.service.getFieldData(this.field, this.formData)
    this.loadData();
    this.getDefaultValue(this.field.fieldID);
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.fullFormData);
  }

  setmyvalue(event: any) {
    console.log('value changed', event.target.value);
    if (event.target.value.length > 3) {
      this.dataOptions = this.service.getFieldData(this.field, this.formData);
    }
  }

  private loadData() {
    this.dataOptions = concat(
      of([]), // default items
      this.searchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.dataOptionsLoading = true),
          switchMap(term => {
            return this.service.getFieldData(this.field, this.fullFormData, {term}).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.dataOptionsLoading = false)
          )})
      )
  );
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index);
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getDefaultValue(field_name: any) {
    this.formData[this.field.fieldID] = this.service.getDefaultValue(field_name, this.defaultValues, this.index || 0);
    if (!!this.formData[this.field.fieldID])
      this.prepareDisplayValues();
  }

  isRequired() {
    return this.service.isRequired(this.field.required, this.field.fieldID);
  }

  setDisplayValue(option: any) {
    if (this.isMultiple()) {
      this.formData[this.field.fieldID + '_displayValue'] = (option.length ? option.map(o => o.value && o.value.ar).filter(r => r) : []);
    } else {
      this.formData[this.field.fieldID + '_displayValue'] = option && option.value.ar;
    }
  }

  prepareDisplayValues() {
    this.dataOptions.subscribe(data => {
      if (this.isMultiple()) {
        let defaultOption = [];
        this.formData[this.field.fieldID].forEach(element => {
          defaultOption.push(data.find(d => d.key == element));
        });
        defaultOption = defaultOption.filter(r => r);
        if (defaultOption.length) {
          this.setDisplayValue(defaultOption);
        }
      } else {
        let defaultOption = data.find(d => d.key == this.formData[this.field.fieldID]);
        if (!!defaultOption) {
          this.setDisplayValue(defaultOption);
        }
      }
    })
  }

  isMultiple() {
    return ((this.field.auxInfo && this.field.auxInfo.multiple) ? this.service.isMultiple(this.field.auxInfo.multiple) : false);
  }

  isEntityName() {
    return !this.isMultiple() && (this.field.auxInfo && !!this.field.auxInfo.entityName)
  }

  getViewResourceUrl() {
    let resourceName = this.field.auxInfo && this.field.auxInfo.entityName
    return `/${resourceName}/profile/${this.formData[this.field.fieldID]}/edit`;
  }

  isActiveEditStep() {
    return this.service.isEditStep && (this.service.editStepField != this.field.fieldID);
  }

  isActiveRejectStep() {
    return this.service.isRejectStep && (this.service.rejectReasonField != this.field.fieldID);
  }
}
