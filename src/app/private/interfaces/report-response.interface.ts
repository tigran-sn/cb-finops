import {IReport} from "./report.interface";

export interface IReportResponse {
  pagination: {
    pageNumber: number,
    pageSize: number,
    totalCount: number,
  }
  reports: IReport[]
}
