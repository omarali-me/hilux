import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.css']
})
export class AutocompleteFieldComponent implements OnInit {

  @Input() field: Field;
  constructor() { }

  ngOnInit(): void {
  }

}
