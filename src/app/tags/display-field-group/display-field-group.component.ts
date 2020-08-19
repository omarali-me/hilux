import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-field-group',
  templateUrl: './display-field-group.component.html',
  styleUrls: ['./display-field-group.component.css']
})
export class DisplayFieldGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string = 'mb3';

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
