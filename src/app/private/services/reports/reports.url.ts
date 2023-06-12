class ReportsUrl {
  get getReports(): string {
    return '/api/GetReports';
  }

  get sendReports(): string {
    return '/api/SendReports';
  }

  get getLookUps(): string {
    return '/api/lookup/reports';
  }
}

export const REPORTS_API_URL = new ReportsUrl();
