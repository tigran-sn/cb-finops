import { environment } from 'src/environments/environment';

export class Environment implements Readonly<typeof environment> {
  production: boolean;
  webUrl: string;
  apiUrl: string;
  identityServerUrl: string;
  whitelistedDomains: string[];
  searchStrLenght: 1;
}
