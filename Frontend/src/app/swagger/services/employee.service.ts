/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { EmployeeDto } from '../models/employee-dto';
@Injectable({
  providedIn: 'root',
})
class EmployeeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param input undefined
   * @return OK
   */
  EmployeeGetByVISAOrNameResponse(input: string): Observable<StrictHttpResponse<Array<EmployeeDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (input != null) __params = __params.set('input', input.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Employee/GetByVISAOrName`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<Array<EmployeeDto>>;
      })
    );
  }
  /**
   * @param input undefined
   * @return OK
   */
  EmployeeGetByVISAOrName(input: string): Observable<Array<EmployeeDto>> {
    return this.EmployeeGetByVISAOrNameResponse(input).pipe(
      __map(_r => _r.body)
    );
  }
}

module EmployeeService {
}

export { EmployeeService }
