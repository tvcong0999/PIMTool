/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProjectDto } from '../models/project-dto';
import { ProjectCreateDto } from '../models/project-create-dto';
@Injectable({
  providedIn: 'root',
})
class ProjectService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  ProjectGetAllResponse(): Observable<StrictHttpResponse<Array<ProjectDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Project/GetAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<Array<ProjectDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  ProjectGetAll(): Observable<Array<ProjectDto>> {
    return this.ProjectGetAllResponse().pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param params The `ProjectService.ProjectGetHaveConditionParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `page`:
   *
   * - `input`:
   *
   * @return OK
   */
  ProjectGetHaveConditionResponse(params: ProjectService.ProjectGetHaveConditionParams): Observable<StrictHttpResponse<Array<ProjectDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.input != null) __params = __params.set('input', params.input.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Project/GetHaveCondition`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<Array<ProjectDto>>;
      })
    );
  }
  /**
   * @param params The `ProjectService.ProjectGetHaveConditionParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `page`:
   *
   * - `input`:
   *
   * @return OK
   */
  ProjectGetHaveCondition(params: ProjectService.ProjectGetHaveConditionParams): Observable<Array<ProjectDto>> {
    return this.ProjectGetHaveConditionResponse(params).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param projectCreateDto undefined
   */
  ProjectCreateResponse(projectCreateDto: ProjectCreateDto): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = projectCreateDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Project/Create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param projectCreateDto undefined
   */
  ProjectCreate(projectCreateDto: ProjectCreateDto): Observable<null> {
    return this.ProjectCreateResponse(projectCreateDto).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
  ProjectDeleteProjectResponse(id: Array<number>): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = id;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Project/DeleteProject`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  ProjectDeleteProject(id: Array<number>): Observable<null> {
    return this.ProjectDeleteProjectResponse(id).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param projectUpdateDto undefined
   */
  ProjectUpdateProjectResponse(projectUpdateDto: ProjectDto): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = projectUpdateDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Project/UpdateProject`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param projectUpdateDto undefined
   */
  ProjectUpdateProject(projectUpdateDto: ProjectDto): Observable<null> {
    return this.ProjectUpdateProjectResponse(projectUpdateDto).pipe(
      __map(_r => _r.body)
    );
  }
}

module ProjectService {

  /**
   * Parameters for ProjectGetHaveCondition
   */
  export interface ProjectGetHaveConditionParams {
    status: number;
    page?: number;
    input?: string;
  }
}

export { ProjectService }
