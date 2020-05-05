import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.css']
})
export class AutocompleteFieldComponent implements OnInit {

  @Input() fieldData: Field;
  constructor() { }

  ngOnInit(): void {
  }

}
