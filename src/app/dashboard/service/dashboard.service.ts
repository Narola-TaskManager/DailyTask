import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManageDateService } from './manage-date.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private http: HttpClient,
        private manageDate: ManageDateService
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

    getTaskdetail(requestPayoad) {
        requestPayoad[`fromDate`] = this.manageDate.objectToDate(requestPayoad.fromDate);
        requestPayoad[`toDate`] = this.manageDate.objectToDate(requestPayoad.toDate);
        return this.http.post('/tasks/report', requestPayoad);
    }

    saveGoogleLink(requestPayload, projectId) {
        return this.http.post('/projects/' + projectId, requestPayload);
    }

}
