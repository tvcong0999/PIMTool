import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProjectServices } from "../Project/services";

@Injectable(

)

export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public projectServices: ProjectServices, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log("event====>", event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.error.ExceptionMessage == "Concurrency Exception Occurred.") {
                    this.projectServices.displayDialog = true;
                }
                else {
                    this.router.navigate(['/page-error']);
                }
                return throwError(error);
            })
        )
    }
}