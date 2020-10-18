import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.css']
})
export class DisplayImageComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
