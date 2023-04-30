export interface StorageConfig {
  cookies: {
    expirationDate: Date | null;
  };
  localStorage: {
    prefix: string;
    suppressWarnings?: boolean;
  };
}
