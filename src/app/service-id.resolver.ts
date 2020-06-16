import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface ServiceId {
  [prop: string]: any;
}

@Injectable()
export class ServiceIdResolver implements Resolve<ServiceId> {

  static UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceId> | Promise<ServiceId> | ServiceId {
    return route.params.serviceId;
  }
}
