import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-view-updates',
    templateUrl: './view-updates.component.html',
    styleUrls: ['./view-updates.component.css']
})
export class ViewUpdatesComponent implements OnInit {

    currentPage = 1;
    itemsPerPage = 5;
    pageSize: number;

    page = 3;
    updateDetail = [
        {
            date: '01-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '02-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '03-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '04-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '05-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '06-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        },
        {
            date: '07-12-2020',
            employeeName: 'Riya Shastri',
            task: 'Login',
            description: 'Worked on User login and Authguard',
            estimatedHour: '4',
            actualHour: '5',
            status: 'Completed',
            tracker: 'True',
        }
    ];
    viewUpdateForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.viewUpdateForm = this.formBuilder.group({
            itemsPerPage: new FormControl(5)
        });
    }

    ngOnInit(): void { }

    get f() { return this.viewUpdateForm.controls; }

    onPageChange(pageNum: number): void {
        console.log("pageNum...", pageNum);
        this.pageSize = this.f[`itemsPerPage`].value * (pageNum - 1);
    }

    changePagesize(): void {
        // console.log("num...", event.taget.value);
        console.log("this.itemsPerPage...", this.f[`itemsPerPage`].value);
        // const num = event;
        // if (!this.pageSize) {
        //     this.pageSize = 0;
        // }
        // console.log("this.pageSize...", this.pageSize);
        // console.log("num...",  Number(num));
        const itemsPerPage = this.pageSize + Number(this.f[`itemsPerPage`].value);
        // console.log("---------------------" , itemsPerPage);

        this.f[`itemsPerPage`].setValue(itemsPerPage);
        // console.log("this.pageSize...", this.f[`itemsPerPage`].value);
    }

}
