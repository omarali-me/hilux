import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.css']
})
export class NumberFieldComponent implements OnInit {

  @Input() fieldData: Field;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
