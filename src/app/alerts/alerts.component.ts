import { Component, OnInit, Input } from '@angular/core';
import { FieldsService } from '../shared/fields.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input() errors: any;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getText(field: any, key: string) {
    return this.service.getText(field, key);
  }

  prepareErrorMessage(error: any) {
    return `${error.key} ${error.value && error.value.ar}`;
  }

  hasErrors() {
    return _.keys(this.errors).length > 0
  }
}
