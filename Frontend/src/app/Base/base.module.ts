import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { GridComponent } from './components';
import { EnumToArrayPipe, } from './pipes'
import { NumberToString } from './pipes/numberToString.enum'



// All exported items hear need to declare in public_api.ts
const DECLARED_EXPORTS = [
    GridComponent, EnumToArrayPipe, NumberToString
];

const ENTRY_COMPONENTS = [];

const RELAYED_EXPORTS = [
    CommonModule, TranslateModule
];

@NgModule({
    declarations: [
        ...DECLARED_EXPORTS
    ],
    providers: [
    ],
    imports: [
        RouterModule,
        ...RELAYED_EXPORTS
    ],
    exports: [
        ...RELAYED_EXPORTS,
        ...DECLARED_EXPORTS
    ]
})
export class PIMBaseModule {
    static forRoot(): ModuleWithProviders<PIMBaseModule> {
        return {
            ngModule: PIMBaseModule
        };
    }
}
