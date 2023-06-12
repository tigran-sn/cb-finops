class SummaryUrl {
  get getSummaryData(): string {
    return '/api/GetSummaryReports';
  }

  get getLookUps(): string {
    return '/api/lookup/summary';
  }
}

export const SUMMARY_URL = new SummaryUrl();
