import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PIMBaseModule } from '../Base/base.module';
import { ShellComponent } from './components/shell/shell.component';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


@NgModule({
    declarations: [
        ShellComponent
    ],
    imports: [
        RouterModule,
        PIMBaseModule,
        DialogModule,
        ButtonModule
    ]
})
export class ShellModule {

}
