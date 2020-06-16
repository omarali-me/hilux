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
  
  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    // this.dataOptions = this.service.getFieldData(this.field, this.formData)
    this.loadData();
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
            console.log('testing 123', this.formData)
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
}
