class ReportsUrl {
  get getReports(): string {
    return '/api/GetReports';
  }

  get sendReports(): string {
    return '/api/SendReports';
  }

  get createReport(): string {
    return '/api/CreateReport';
  }

  get updateReport(): string {
    return '/api/UpdateReport';
  }

  get getLookUps(): string {
    return '/api/lookup/reports';
  }

  get getPartnersList(): string {
    return '/api/GetPartnersList';
  }

  get deleteReports(): string {
    return '/api/DeleteReports';
  }
}

export const REPORTS_API_URL = new ReportsUrl();
