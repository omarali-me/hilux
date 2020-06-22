import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-button',
  templateUrl: './display-button.component.html',
  styleUrls: ['./display-button.component.css']
})
export class DisplayButtonComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
