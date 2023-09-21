import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems$: Observable<any>;
  items: any;
  isLoggedIn: any;
  openSubMenu: boolean = false;
  openSubmenuIndex: any;
  searchInput$ = '';

  constructor(private fieldsService: FieldsService,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.menuItems$ = this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices?channel=hilux`);
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/applications/isLoggedIn`)
      .subscribe((res) => {
        this.isLoggedIn = res;
      });

  }

  searchtServices() {
    if (this.searchInput$ === '') {
      this.menuItems$ = this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices?channel=hilux`);
    } else {
      this.menuItems$ = this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices?channel=hilux`, { search: this.searchInput$ });
    }
  }
  navigateServicesName(key: any) {
     this.router.navigate(['service/' + key ])
            .then(() => {
              window.location.reload();
            });
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
