import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements OnInit {
  response: any;
  serviceId: Observable<any>;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.serviceId = this.route.data.pipe(pluck('serviceId'));
    this.serviceId.subscribe((service) => {
      let fd = new FormData();
      fd.append('data', JSON.stringify({ channel: 'hilux', serviceID: _.toInteger(service)}));
      // fd.append('data.serviceID', service);
      // fd["data"] = { channel: 'hilux', serviceID: _.toInteger(service)}
      this.http.post(`https://wfe.ajm.re/AjmanLandProperty/index.php/applications/startService`, fd)
        .subscribe((data: any) => {
          if (data.status == 'success') {
            this.response = data.data;
          } else {
            alert(data.message);
          }
        }, (err) => {
          alert(err.message);
        })
    })
  }

}
