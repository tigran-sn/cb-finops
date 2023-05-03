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
        name: 'Filled Reports',
        path: 'reports/filled-reports',
      },
      {
        key: 'sentReports',
        name: 'Sent Reports',
        path: 'reports/sent-reports',
      },
    ],
  },
  {
    key: 'summaryInformation',
    name: 'Summary Information',
    path: 'summary',
  },
];
