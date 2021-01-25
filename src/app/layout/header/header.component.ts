import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin = false;

    constructor(
        private authService: AuthService
    ) {
        this.isLogin = this.authService.checkUserLoggedIn();
        this.authService.authStatus.subscribe((message) => {
            if (message === 'login' || message === 'logout') {
                this.isLogin = this.authService.checkUserLoggedIn();
            }
        });
    }

    ngOnInit(): void { }

    logout() {
        this.authService.logout();
        this.isLogin = this.authService.checkUserLoggedIn();
    }

    syncWithEasyCollab() {
        this.authService.syncEasyCollab().toPromise().then(res => {
            if (res && (res[`errorMessage`] === null)) {
                window.location.reload();
            } else if (res && (res[`errorMessage`] !== null)) {
                Swal.fire({
                    text: res[`errorMessage`],
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
            }
        }).catch(err => {
            if (err) {
                Swal.fire({
                    text: err[`message`],
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
            }
        });
    }
}
