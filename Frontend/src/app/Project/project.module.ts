import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PIMBaseModule } from '@base';
import { ProjectListComponent } from './components';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import {SliderModule} from 'primeng/slider';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { CookieService } from 'ngx-cookie-service';

import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { ShowMessageErrorComponent } from './components/show-message-error/show-message-error.component';

@NgModule({
    declarations: [ProjectListComponent, ProjectCreateComponent, ShowMessageErrorComponent],
    providers: [CookieService],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        PIMBaseModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        AutoCompleteModule,
        CalendarModule,
        TableModule,
        MultiSelectModule,
        SliderModule,
        PaginatorModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        ToastModule,
        ConfirmDialogModule,        
    ]
})
export class ProjectModule {

}
