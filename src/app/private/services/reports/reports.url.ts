class ReportsUrl {
  get getReports(): string {
    return '/GetReports';
  }
}

export const REPORTS_API_URL = new ReportsUrl();
