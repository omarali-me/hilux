import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ImageGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
