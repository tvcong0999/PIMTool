/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GroupDto } from '../models/group-dto';
@Injectable({
  providedIn: 'root',
})
class GroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  GroupGetAllResponse(): Observable<StrictHttpResponse<Array<GroupDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Group/GetAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<Array<GroupDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  GroupGetAll(): Observable<Array<GroupDto>> {
    return this.GroupGetAllResponse().pipe(
      __map(_r => _r.body)
    );
  }
}

module GroupService {
}

export { GroupService }
