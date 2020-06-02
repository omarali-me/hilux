import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-end-criteria-generator',
  templateUrl: './end-criteria-generator.component.html',
  styleUrls: ['./end-criteria-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class EndCriteriaGeneratorComponent implements OnInit {

  @Input() formData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
