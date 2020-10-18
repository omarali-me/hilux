import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-button-group',
  templateUrl: './display-button-group.component.html',
  styleUrls: ['./display-button-group.component.css']
})
export class DisplayButtonGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
