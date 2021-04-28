/* tslint:disable */
export interface ProjectDetailDto {
  Id?: number;
  GroupId?: number;
  ProjectNumber?: number;
  Name?: string;
  Customer?: string;
  Status?: number;
  StartDate?: string;
  FinishDate?: string;
  EmployeeIds?: Array<number>;
}
