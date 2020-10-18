import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-pdf-gallery',
  templateUrl: './display-pdf-gallery.component.html',
  styleUrls: ['./display-pdf-gallery.component.css']
})
export class DisplayPdfGalleryComponent implements OnInit {

  @Input() data: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
