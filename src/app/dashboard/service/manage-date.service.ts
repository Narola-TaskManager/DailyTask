import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ManageDateService {

    currentDate = new Date();

    constructor() { }

    objectToDate(dateObj) {
        // {year: 2020, month: 7, day: 15}
        const dateString = dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
        const fullDate = new Date(dateString);
        return moment(fullDate).format('YYYY-MM-DD');
    }

    dateToObject(date) {
        // 2020-7-15
        const dateObj = {};
        dateObj[`month`] = JSON.parse(moment(date, 'YYYY-MM-DD').format('M'));
        dateObj[`day`] = JSON.parse(moment(date, 'YYYY-MM-DD').format('D'));
        dateObj[`year`] = JSON.parse(moment(date, 'YYYY-MM-DD').format('YYYY'));
        return dateObj;
    }

    currentDateInObject() {
        return this.dateToObject(this.currentDate);
    }

    currentDateInDateFormate(objFormat) {
        return this.objectToDate(objFormat);
    }

    setMaxDate() {
        const cDate = this.currentDateInObject();
        return { year: cDate[`year`], month: cDate[`month`], day: cDate[`day`] };
    }

    setMinDate() {
        const cDate = this.currentDateInObject();
        return { year: cDate[`year`] - 10, month: 1, day: 1 };
    }

}
