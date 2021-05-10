import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProjectServices } from "../Project/services";

@Injectable(

)

export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public projectServices: ProjectServices) { }

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
                return throwError(error);
            })
        )
    }
}