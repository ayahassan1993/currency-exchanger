import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders,
    HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(
        private spinner: NgxSpinnerService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        this.count++;
        let headers: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${environment.apiKey}`
        });
        request = request.clone({
            headers: headers,
            url: `${environment.apiUrl}/${environment.apiKey}/${request.url}`,
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            }),
            finalize(() => {
                this.count--;
                if (this.count === 0) { this.spinner.hide(); }
            }
            )
        );
    }

}


