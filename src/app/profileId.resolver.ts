import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface ProfileId {
  [prop: string]: any;
}

@Injectable()
export class ProfileIdResolver implements Resolve<ProfileId> {

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileId> | Promise<ProfileId> | ProfileId {
    return route.params.profileId;
  }
}
