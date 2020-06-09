import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems$: Observable<any>;

  constructor(private fieldsService: FieldsService) { }

  ngOnInit(): void {
    this.menuItems$ = this.fieldsService.getUrl('http://192.168.0.150:3000/menu');
  }

  getServiceProviderItem(data: any) {
    return data.serviceCategoryName && data.serviceCategoryName.ar;
  }

  getServiceName(data: any) {
    return data && data.ar;
  }

  hideRoot(data: any) {
    return (this.getServiceProviderItem(data) == 'root') ;
  }

}
