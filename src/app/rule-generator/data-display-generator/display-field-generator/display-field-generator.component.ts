import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-display-field-generator',
  templateUrl: './display-field-generator.component.html',
  styleUrls: ['./display-field-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DisplayFieldGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;

  constructor() { }

  ngOnInit(): void {
  }

}
