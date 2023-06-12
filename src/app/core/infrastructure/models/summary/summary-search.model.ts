import { ReportTypeEnum } from '../../enums';
import { BaseSearchModel } from '../base';

export class SummarySearchModel extends BaseSearchModel {
  reportType: ReportTypeEnum;

  constructor(props: any) {
    super(
      props.keyWord,
      props.orderByField,
      props.orderDirection,
      props.pageNumber,
      props.pageSize
    );
    this.reportType = ReportTypeEnum.All;
  }
}
