
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    if (req.url !== 'https://wfe.ajm.re/ajaxupload.php') {
      req = req.clone({
        withCredentials: true
      });
    }
    else {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer sy3rHBHVD3U7VxMs6vuSLU32')
      });
    }

    return next.handle(req);
  }
}
