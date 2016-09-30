import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CCScheduleEntry, CCScheduleService } from "../ccscheduledata";
import { UtilService } from "../shared";

@Component({
  selector: 'cc-schedule-table-by-pm',
  templateUrl: "./scheduletablebypm.component.html",
  styles: [`
:host {
  margin-top: 20px;
  padding: 10px;
  display: block;
  border: 1px solid black;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,td {
  text-align: left;
}
th:first-child { width: 110px }
th:nth-child(2) { width: 55px }
th:nth-child(3) { width: 220px }
.thisWeek {
  background-color: #fff0eb
}
.today {
  background-color: #ffd0ca;
}
.day-5 td {

}
  `],
})
export class ScheduleTableByPmComponent {
  @Input() entries: CCScheduleEntry[];

  constructor(private _utilService: UtilService) {
    // Do stuff
  }

  projectDisplayName(entry: CCScheduleEntry) {
    if (!entry.project || !entry.project.name) return "-";
    let prefix = entry.project.id ? `[${entry.project.id}] ` : "";
    return `${prefix} ${entry.project.name}`;
  }

  isToday(date: Date) {
    return this._utilService.isToday(date);
  }

  isThisWeek(date: Date) {
    return this._utilService.isSameWeek(date);
  }
}
