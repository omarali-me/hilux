import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-button-group',
  templateUrl: './display-button-group.component.html',
  styleUrls: ['./display-button-group.component.css']
})
export class DisplayButtonGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
