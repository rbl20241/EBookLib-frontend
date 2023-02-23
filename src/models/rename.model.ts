export class Rename {
  id: number;
  userId: number;
  sourceMap: string;
  sourceTitleAuthorSeparator: string;
  sourceAuthornameSeparator: string;
  sourceFormat: string;
  destMap: string;
  destTitleAuthorSeparator: string;
  destAuthornameSeparator: string;
  destFormat: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.sourceMap = '';
    this.sourceTitleAuthorSeparator = '';
    this.sourceAuthornameSeparator = '';
    this.sourceFormat = '';
    this.destMap = '';
    this.destAuthornameSeparator = '';
    this.destTitleAuthorSeparator = '';
    this.destFormat = '';
  }
}
