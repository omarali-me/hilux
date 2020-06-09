import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../shared/fields.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})

export class CustomPageComponent implements OnInit {
  response$: Observable<any>;

  constructor(private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.response$ = this.fieldsService.getUrl('http://192.168.0.150:3000/custom_page');
  }

}
