import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-link',
  templateUrl: './display-link.component.html',
  styleUrls: ['./display-link.component.css']
})
export class DisplayLinkComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
