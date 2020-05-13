import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-fields',
  templateUrl: './display-fields.component.html',
  styleUrls: ['./display-fields.component.css']
})
export class DisplayFieldsComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
