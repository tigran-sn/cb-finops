class ReportsUrl {
  get getReports(): string {
    return '/api/reports';
  }
}

export const REPORTS_API_URL = new ReportsUrl();
