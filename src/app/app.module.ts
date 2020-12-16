import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { AuthenticationGuard } from './core/guard/authentication.guard';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,
        NgbModule,
        ShareModule
    ],
    providers: [
        AuthenticationGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
