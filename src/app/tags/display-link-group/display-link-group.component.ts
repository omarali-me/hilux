import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../../shared/fields.service';

@Component({
  selector: 'app-display-link-group',
  templateUrl: './display-link-group.component.html',
  styleUrls: ['./display-link-group.component.css']
})
export class DisplayLinkGroupComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getClass(classname: string, data: any) {
    return classname + this.service.getFieldWidth(data.displayWidth)
  }
}
