import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

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
        const finalRequest = request.clone({
            url,
            headers: new HttpHeaders(headerObj)
        });
        return next.handle(
            finalRequest
        ).pipe(
            timeout(30000),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigate(['/']);
                    this.authService.logout();
                }
                return throwError(err);
            })
        );
    }
}
