/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProjectDto } from '../models/project-dto';
import { ProjectDetailDto } from '../models/project-detail-dto';
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
   * @param id undefined
   * @return OK
   */
  ProjectGetDetailResponse(id: number): Observable<StrictHttpResponse<ProjectDetailDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Project/GetDetail/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ProjectDetailDto>;
      })
    );
  }
  /**
   * @param id undefined
   * @return OK
   */
  ProjectGetDetail(id: number): Observable<ProjectDetailDto> {
    return this.ProjectGetDetailResponse(id).pipe(
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
   * - `orderSort`:
   *
   * - `input`:
   *
   * - `columnSort`:
   *
   * @return OK
   */
  ProjectGetHaveConditionResponse(params: ProjectService.ProjectGetHaveConditionParams): Observable<StrictHttpResponse<Array<ProjectDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.orderSort != null) __params = __params.set('orderSort', params.orderSort.toString());
    if (params.input != null) __params = __params.set('input', params.input.toString());
    if (params.columnSort != null) __params = __params.set('columnSort', params.columnSort.toString());
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
   * - `orderSort`:
   *
   * - `input`:
   *
   * - `columnSort`:
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
  ProjectUpdateProjectResponse(projectUpdateDto: ProjectDetailDto): Observable<StrictHttpResponse<null>> {
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
  ProjectUpdateProject(projectUpdateDto: ProjectDetailDto): Observable<null> {
    return this.ProjectUpdateProjectResponse(projectUpdateDto).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param projectNumber undefined
   * @return OK
   */
  ProjectValidateProjectNumberResponse(projectNumber: number): Observable<StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (projectNumber != null) __params = __params.set('projectNumber', projectNumber.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Project/ValidateProjectNumber`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param projectNumber undefined
   * @return OK
   */
  ProjectValidateProjectNumber(projectNumber: number): Observable<boolean> {
    return this.ProjectValidateProjectNumberResponse(projectNumber).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * @param params The `ProjectService.ProjectCountProjectsParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `input`:
   *
   * @return OK
   */
  ProjectCountProjectsResponse(params: ProjectService.ProjectCountProjectsParams): Observable<StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.input != null) __params = __params.set('input', params.input.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Project/CountProjects`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as StrictHttpResponse<number>
      })
    );
  }
  /**
   * @param params The `ProjectService.ProjectCountProjectsParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `input`:
   *
   * @return OK
   */
  ProjectCountProjects(params: ProjectService.ProjectCountProjectsParams): Observable<number> {
    return this.ProjectCountProjectsResponse(params).pipe(
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
    orderSort?: number;
    input?: string;
    columnSort?: string;
  }

  /**
   * Parameters for ProjectCountProjects
   */
  export interface ProjectCountProjectsParams {
    status: number;
    input?: string;
  }
}

export { ProjectService }
