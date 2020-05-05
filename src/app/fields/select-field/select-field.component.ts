import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {

  @Input() fieldData: Field;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
