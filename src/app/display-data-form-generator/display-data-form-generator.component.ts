import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-data-form-generator',
  templateUrl: './display-data-form-generator.component.html',
  styleUrls: ['./display-data-form-generator.component.css']
})
export class DisplayDataFormGeneratorComponent implements OnInit {

  @Input() response: any;

  constructor() { }

  ngOnInit(): void {
  }

}
