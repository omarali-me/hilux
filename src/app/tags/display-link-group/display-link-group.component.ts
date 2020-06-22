import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-link-group',
  templateUrl: './display-link-group.component.html',
  styleUrls: ['./display-link-group.component.css']
})
export class DisplayLinkGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
