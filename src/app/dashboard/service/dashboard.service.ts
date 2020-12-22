import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private http: HttpClient,
    ) { }

    getProjectsAndTask() {
        return this.http.get('/projects/taskmasters');
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

    getProject() {
        return this.http.get('/projects/byprojecthead');
    }

    getUserByProjects(projectId) {
        return this.http.get('/projects/' + projectId + '/users ');
    }

    getTaskdetail(projectId, userId, filterBy) {
        return this.http.get('/tasks/report?projectId=' + projectId + '&userId=' + userId + '&outputBy=' + filterBy);
    }
}
