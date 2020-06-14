import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-gallery-generator',
  templateUrl: './image-gallery-generator.component.html',
  styleUrls: ['./image-gallery-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ImageGalleryGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
