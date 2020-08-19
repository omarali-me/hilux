import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-field-data',
  templateUrl: './display-field-data.component.html',
  styleUrls: ['./display-field-data.component.css']
})
export class DisplayFieldDataComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
