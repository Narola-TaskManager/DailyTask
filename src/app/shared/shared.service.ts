import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }

    private authSource = new BehaviorSubject(false);
    authStatus = this.authSource.asObservable();

    changeAuthStatus(message: boolean) {
        this.authSource.next(message);
    }
}
