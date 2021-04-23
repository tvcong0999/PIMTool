/* tslint:disable */
export interface ProjectUpdateDto {
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
