import { Separator } from './separator.model';
import { Format } from './format.model';

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
}
