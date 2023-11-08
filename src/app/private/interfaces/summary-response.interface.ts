import {ISummary} from "./summary.interface";

export interface ISummaryResponse {
  pagination: {
    pageNumber: number,
    pageSize: number,
    totalCount: number,
  }
  summaryReports: ISummary[]
}
