import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {

  @Input() fieldData: Field;
  constructor() { }

  ngOnInit(): void {
  }

}
