import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../fields';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.css']
})
export class TextAreaFieldComponent implements OnInit {

  @Input() fieldData: Field;
  constructor() { }

  ngOnInit(): void {
  }

}
