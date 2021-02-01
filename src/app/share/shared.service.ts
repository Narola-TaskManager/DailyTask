import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private syncApiCalled = new BehaviorSubject(false);
    currentSyncValue = this.syncApiCalled.asObservable();

    constructor() { }

    changeMessage(message) {
        this.syncApiCalled.next(message);
    }

}
