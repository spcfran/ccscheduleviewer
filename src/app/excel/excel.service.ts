import { Injectable } from '@angular/core';
const ExcelWorker = require("worker!./excel-worker");
import { IExcelParserOptions, IExcelWorkbookResult } from "./excel.model";

@Injectable()
export class ExcelService {
  killWorkerAfterFinished = true;

  constructor() {

  }

  loadExcel(docUrl: string, options: IExcelParserOptions): Promise<IExcelWorkbookResult> {
    return new Promise((resolve, reject) => {
      let worker: Worker = new ExcelWorker();

      worker.postMessage({ url: docUrl, options });

      worker.onmessage = (event) => {
        let data = event.data as IExcelWorkbookResult;
        console.log(`Browser received data`, data);
        resolve(data);
        if (this.killWorkerAfterFinished) { worker.terminate(); }
      };
    });
  }

}
