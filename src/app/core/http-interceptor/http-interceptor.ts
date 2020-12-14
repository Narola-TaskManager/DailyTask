import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('accessToken');
        const apiUrl = environment.apiRoot;
        const reqUrl = request.url.trim();
        const url = reqUrl[0] === '/' ? apiUrl + reqUrl : reqUrl;

        const headerObj: any = {
            Accept: 'application/json',
        };
        if (token) {
            headerObj.Authorization = 'Bearer ' + token;
        }
        if (request.headers.get('isFile')) {
            headerObj['Content-Type'] = 'multipart/form-data';
        }

        return next.handle(
            request.clone({
                url,
                headers: new HttpHeaders(headerObj)
            })
        );
    }
}
