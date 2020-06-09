import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-field-data',
  templateUrl: './display-field-data.component.html',
  styleUrls: ['./display-field-data.component.css']
})
export class DisplayFieldDataComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
