import { IMenu } from '../../../core/infrastructure/interfaces';

export const PATHS: IMenu[] = [
  {
    key: '',
    name: 'Reports',
    path: '',
    menuItems: [
      {
        key: 'reports',
        name: 'All',
        path: 'reports',
      },
      {
        key: 'filledReports',
        name: 'FilledReports',
        path: 'reports/filled-reports',
      },
      {
        key: 'sentReports',
        name: 'SentReports',
        path: 'reports/sent-reports',
      },
    ],
  },
  {
    key: 'summaryInformation',
    name: 'FinancialSummaryData',
    path: 'summary',
  },
];
