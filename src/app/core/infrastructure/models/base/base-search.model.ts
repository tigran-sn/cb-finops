export class BaseSearchModel {
  constructor(
    public keyWord?: string,
    public orderByField?: string,
    public orderDirection?: string,
    public pageNumber?: number,
    public pageSize?: number
  ) {}
}
