import { KKWebComponentHandler } from '../../components/KKWebComponent/KKWebComponent.type';

export interface KKFooter extends KKWebComponentHandler {
  setCopyright({ date, author, termsReferenceUrl }: Copyrights): void;
}

export interface Copyrights {
  date: string;
  author: string;
  termsReferenceUrl: string;
}
