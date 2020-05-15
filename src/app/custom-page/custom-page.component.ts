import { Component, OnInit } from '@angular/core';
import { RESPONSE_DATA } from '../shared/data';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})

export class CustomPageComponent implements OnInit {
  response: any;

  constructor(
  ) { }

  ngOnInit(): void {
    this.response = RESPONSE_DATA;
  }

}
