export class AppClientError extends Error {
  public readonly businessCode: string;

  constructor(message: string, businessCode?: string) {
    super(message);
    this.businessCode = businessCode || 'UNKOWN_BUSINESS_CODE';
  }
}
