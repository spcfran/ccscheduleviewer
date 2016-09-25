export interface IExcelParserOptions {
  sheetsToParse: string[] | "all";
}

export interface IExcelWorkbookResult {
  lastModified: Date;
  sheetNames: string[];
  sheets: { [key: string]: any[] };
}