import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-row',
  templateUrl: './dynamic-row.component.html',
  styleUrls: ['./dynamic-row.component.css']
})
export class DynamicRowComponent implements OnInit {

  @Input() rowForm: FormGroup
  @Input() index: number
  @Output() deleteRow: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit() {
    console.log('in row form', this.rowForm);
  }

  delete() {
    this.deleteRow.emit(this.index)
  }
}
