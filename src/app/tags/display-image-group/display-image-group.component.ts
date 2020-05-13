import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-image-group',
  templateUrl: './display-image-group.component.html',
  styleUrls: ['./display-image-group.component.css']
})
export class DisplayImageGroupComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
