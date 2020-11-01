import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../shared/fields.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements OnInit {
  response: any;
  serviceId: Observable<any>;
  services: any;
  selectedService: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.serviceId = this.route.data.pipe(pluck('serviceId'));
    this.serviceId.subscribe((service) => {
      let fd = new FormData();
      fd.append('data', JSON.stringify({ channel: 'hilux', serviceID: _.toInteger(service)}));
      this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/applications/startService`, fd)
        .subscribe(async (data: any) => {
          if (data.status == 'success') {
            await this.getServices(service);
            this.response = data.data;
          } else {
            this.toastr.error(data.message, 'Error')
          }
        }, (err) => {
          alert(err.message);
        })
    })
  }

  private getServices(serviceId: any) {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/getServices`)
      .subscribe((data) => {
        let services = {};
        _.values(data).forEach(category => {
          services = Object.assign({}, services, category.services);
        });
        // console.log(services);   
        this.selectedService = services[serviceId];
      })
  }

  getServiceText() {
    return (this.selectedService && this.selectedService.ar) || 'Service Page';
  }
}
