import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-pdf-gallery',
  templateUrl: './display-pdf-gallery.component.html',
  styleUrls: ['./display-pdf-gallery.component.css']
})
export class DisplayPdfGalleryComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
