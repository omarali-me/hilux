import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProfileId {
  [prop: string]: any;
}

@Injectable()
export class ApplicationSearchResolver implements Resolve<any> {

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const applicationId = route.params.applicationId;
    console.log('applicationId', applicationId);
    return applicationId ? this.getApplication(applicationId) : { }
  }

  getApplication(applicationId: any) {
    let fd = new FormData();
    fd.append('data', JSON.stringify(Object.assign({}, { applicationID: applicationId } )));

    return this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/Applications/oneApplicationDetailHilux`, fd)
  }
}
