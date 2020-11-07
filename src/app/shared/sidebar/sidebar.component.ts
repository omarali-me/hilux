import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems$: Observable<any>;
  items: any;
  openSubMenu: boolean = false;
  openSubmenuIndex: any;
  searchInput$ = '';

  constructor(private fieldsService: FieldsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.menuItems$ = this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices`);
  }

  searchtServices() {
    this.menuItems$ = this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices`, { search: this.searchInput$ });
  }
  getServiceProviderItem(data: any) {
    return data.serviceCategoryName && data.serviceCategoryName.ar;
  }
  getServiceProviderIcon(data: any) {
    return data.serviceCategoryName && data.serviceCategoryName.icon;
  }

  getServiceName(data: any) {
    return data && data.ar;
  }
  getServiceIcon(data: any) {
    return data && data.icon;
  }

  hideRoot(data: any) {
    return (this.getServiceProviderItem(data) == 'root');
  }

  callServicehandler(item: any) {
    console.log('here submenu', item)
  }

  toggleClass(event: any) {
    let target = event.currentTarget;
    let attrs = target.attributes;
    var value = attrs.class.nodeValue;

    if (value.match(/menu-open/)) {
      $(target).removeClass('menu-open');
    } else {
      $(target).addClass('menu-open');
    }
  }
}
