import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private http: HttpClient,
    ) { }

    getProjects() {
        return this.http.get('/projects');
    }

    getAllSaveTask() {
        return this.http.get('/tasks');
    }

    getAllTaskForDropdown(projectId) {
        return this.http.get('/projects/' + projectId + '/taskmasters');
    }

    saveTask(requestPayload) {
        return this.http.post('/tasks', requestPayload);
    }

}
