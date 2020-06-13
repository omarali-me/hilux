import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-display-field-generator',
  templateUrl: './display-field-generator.component.html',
  styleUrls: ['./display-field-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DisplayFieldGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
