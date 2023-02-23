export class UserSettings {
  id: number;
  userId: number;

  copyTo: string;
  mailTo: string;

  isDateSort: boolean;
  isNameSort: boolean;

  isEpubSelected: boolean;
  isMobiSelected: boolean;
  isPdfSelected: boolean;
  isCbrSelected: boolean;

  mailHost: string;
  mailPort: string;
  mailUserName: string;
  mailPassword: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.copyTo = '';
    this.mailTo = '';
    this.mailPassword = '';
    this.isDateSort = false;
    this.isNameSort = true;
    this.isEpubSelected = true;
    this.isMobiSelected = true;
    this.isPdfSelected = true;
    this.isCbrSelected = true;
    this.mailHost = '';
    this.mailPort = '';
    this.mailUserName = '';
    this.mailPassword = '';
  }
}
