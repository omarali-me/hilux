import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-start-criteria-generator',
  templateUrl: './start-criteria-generator.component.html',
  styleUrls: ['./start-criteria-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class StartCriteriaGeneratorComponent implements OnInit {

  @Input() formData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
