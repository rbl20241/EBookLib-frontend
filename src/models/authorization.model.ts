export class Authorization {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    tokenExpirationMsec: number;
    scope: string;

    constructor() {
      this.accessToken = '';
      this.tokenType = '';
      this.refreshToken = '';
      this.tokenExpirationMsec = 3600;
      this.scope = '';
    }
}
