import * as XLSX from "xlsx";
import { IExcelParserOptions, IExcelWorkbookResult } from "./excel.model";

onmessage = function (event) {
    log("message received:", event);

    const data = event.data as { url: string, options: IExcelParserOptions };
    
    requestFile(data.url).then((workbook) =>
        processFile(workbook, data.options)).then((result) => {
            log("Workbook processed. Returning to main thread");
            postMessage(result, undefined);
        });
}

function processFile(workbook: XLSX.IWorkBook, options: IExcelParserOptions): IExcelWorkbookResult {
    log("File parsed. Processing...");
    const res: IExcelWorkbookResult = {
        sheetNames: workbook.SheetNames,
        lastModified: workbook.Props.ModifiedDate,
        sheets: {}
    };

    res.sheetNames.filter(sheetName => options.sheetsToParse == "all" || options.sheetsToParse.indexOf(sheetName) >= 0)
    .forEach(sheetName => {
        const rows = (XLSX.utils as any).sheet_to_row_object_array(workbook.Sheets[sheetName]);    
        res.sheets[sheetName] = rows;
    });

    return res;
}

function requestFile(url: string): Promise<XLSX.IWorkBook> {
    return new Promise((resolve, reject) => {
        const oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (oEvent) {
            log("File downloaded. Parsing...");
            const arrayBuffer = oReq.response; // Note: not oReq.responseText
            const byteArray = new Uint8Array(arrayBuffer);

            let workbook: XLSX.IWorkBook = XLSX.read(byteArray, { type: "buffer" });
            resolve(workbook);
        };
        log("Downloading file...");
        oReq.send(null);
    });
}

function log(message: string, data?: any) {
    const dt = new Date();
    const ms = dt.getTime().toString().slice(-3);
    console.log(`${dt.toTimeString().substr(0, 8)}:${ms} [Worker] ${message}`);
    if (data) console.log(data);
}