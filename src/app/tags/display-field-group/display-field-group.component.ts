import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-field-group',
  templateUrl: './display-field-group.component.html',
  styleUrls: ['./display-field-group.component.css']
})
export class DisplayFieldGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string = 'mb3';

  constructor() { }

  ngOnInit(): void {
  }

}
