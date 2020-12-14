import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private shareDataService: SharedService,

    ) { }

    login(requestPayload) {
        return this.http.post('/auth/login', requestPayload);
    }

    setToken(response) {
        localStorage.clear();
        window.localStorage.setItem('accessToken', response[`token`]);
        this.shareDataService.changeAuthStatus(true);
    }

}
