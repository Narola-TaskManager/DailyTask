import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    ) { }

    login(requestPayload) {
        return this.http.post('/auth/login', requestPayload);
    }

    setToken(response) {
        localStorage.clear();
        window.localStorage.setItem('accessToken', response[`token`]);
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
        localStorage.clear();
        this.changeAuthStatus('logout');
    }

}
