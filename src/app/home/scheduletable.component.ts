import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CCScheduleEntry } from "../ccscheduledata";

@Component({
  selector: 'cc-schedule-table',
  templateUrl: "./scheduletable.component.html",
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
th:nth-child(4) { width: 150px }
.day-5 td {
  padding-bottom: 40px;
  border-bottom: 1px solid #ccc;
}
  `],
})
export class ScheduleTableComponent {
  @Input() entries: CCScheduleEntry[];

  constructor() {
    // Do stuff
  }
}
