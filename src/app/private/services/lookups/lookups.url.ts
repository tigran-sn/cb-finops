class LookupsUrl {
  get getLookUps(): string {
    return '/api/lookup/';
  }
}

export const LOOKUPS_API_URL = new LookupsUrl();
