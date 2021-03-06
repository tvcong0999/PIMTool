import { Location } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { PIMBaseModule } from './Base/base.module';
import { ShellComponent } from './Shell/components';
import { ShellModule } from './Shell/shell.module';
import { ApiConfiguration } from './swagger/api-configuration';
import { EnvironmentApiConfiguration } from './api-config';
import { EmployeeComponent } from './Employee/components/employee/employee.component';
import { GroupComponent } from './Groups/components/group/group.component';
import { HttpConfigInterceptor } from './Interceptor/httpconfig.interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProjectComponent } from './Project/components/project.component';




export function HttpLoaderFactory(http: HttpClient, loc: Location) {
  return new TranslateHttpLoader(http, loc.prepareExternalUrl('/assets/i18n/'), '.json');
}

@NgModule({
  declarations: [
    EmployeeComponent,
    GroupComponent,
    ErrorPageComponent,
    ProjectComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    PIMBaseModule.forRoot(),
    ShellModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, Location]
      }
    }),
    HttpClientModule,
    DialogModule,
    ButtonModule

  ],
  providers: [
    {
      provide: ApiConfiguration,
      useClass: EnvironmentApiConfiguration as any,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
  ],
  bootstrap: [ShellComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {

  }
}
