import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.menuItems = this.http.get('http://localhost:3000/menu');
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
