import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-image-group',
  templateUrl: './display-image-group.component.html',
  styleUrls: ['./display-image-group.component.css']
})
export class DisplayImageGroupComponent implements OnInit {

  @Input() data: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
