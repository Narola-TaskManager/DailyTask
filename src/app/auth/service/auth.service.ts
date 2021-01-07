import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authSource = new BehaviorSubject('default');
    authStatus = this.authSource.asObservable();

    changeAuthStatus(message) {
        this.authSource.next(message);
    }

    constructor(
        private http: HttpClient,
        private permissionsService: NgxPermissionsService,
    ) { }

    login(requestPayload) {
        return this.http.post('/auth/login', requestPayload);
    }

    setToken(token) {
        localStorage.clear();
        window.localStorage.setItem('accessToken', token);
        this.changeAuthStatus('login');
    }

    checkUserLoggedIn() {
        const token = localStorage.getItem('accessToken');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.permissionsService.flushPermissions();
        localStorage.clear();
        this.changeAuthStatus('logout');
    }

    syncEasyCollab() {
        return this.http.get('/projects/sync');
    }

}
