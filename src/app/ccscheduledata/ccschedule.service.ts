import { Injectable } from '@angular/core';
import { ExcelService } from "../excel/excel.service";
import { IExcelParserOptions, IExcelWorkbookResult } from "../excel/excel.model";
import { CCSchedule, CCScheduleEntry } from "./ccschedule.model";

@Injectable()
export class CCScheduleService {
  private schedule: CCSchedule;

  constructor(private _excelService: ExcelService) {

  }

  loadSchedule(docUrl: string): Promise<CCSchedule> {
    let options: IExcelParserOptions = {
      sheetsToParse: "all"
    };

    return this._excelService.loadExcel(docUrl, options).then((excelResult: IExcelWorkbookResult) => {

      let employees = excelResult.sheets["ActiveEmployeeList"].map(emp => emp["ResourceName"]);
      let entries: CCScheduleEntry[] = excelResult.sheets["EnterpriseScheduleData"].map(entry => CCScheduleEntry.fromRawObject(entry));
      let schedule = new CCSchedule();
      schedule.employees = employees;
      schedule.entries = entries;

      return schedule;
    });
  }
}
