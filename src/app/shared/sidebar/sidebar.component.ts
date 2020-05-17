import { Component, OnInit } from '@angular/core';
import { MENU_DATA } from '../data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = MENU_DATA;
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
