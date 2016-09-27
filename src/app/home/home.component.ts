import { Component, OnInit, Input } from '@angular/core';
import { SPHelperService, UtilService } from "../shared";
import { CCScheduleService, CCSchedule, CCScheduleEntry } from "../ccscheduledata";
import { groupBy, sortBy } from "lodash";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private status = "Click button";
  private scheduleByEmployee: ({[key: string]: CCScheduleEntry[]}) = {};
  private allEmployees = [];
  private selectedEmployee = "";
  private selectedEntries: CCScheduleEntry[] = [];
  private showPastWeeks: boolean = false;
  @Input() autoInit: boolean = false;
  @Input() docUrl: string = "";

  constructor(private _ccScheduleService: CCScheduleService, private _spHelper: SPHelperService, private _util: UtilService) {
    // Do stuff
  }

  ngOnInit() {
    if (this.autoInit) {
      this.loadSchedule();
    }
  }

  recalculateEntries() {
    let today = this._util.dateOnly(new Date());
    let entries = groupBy
    this.selectedEntries = (this.scheduleByEmployee[this.selectedEmployee] || [])
      .filter(entry => this.showPastWeeks ? entry : (this._util.isSameWeek(entry.date, today) || entry.date >= today))
    ;
  }

  loadSchedule() {
    this.status = "loading";
    this._ccScheduleService.loadSchedule(this.docUrl).then(schedule => {
      let allEntries = sortBy(schedule.entries, entry => entry.date);
      this.scheduleByEmployee = groupBy(allEntries, entry => entry.employee);
      this.allEmployees = schedule.employees;

      this.status = `Loaded ${allEntries.length} entries for ${this.allEmployees.length} employees`;

      this.selectedEmployee = this._spHelper.getCurrentUserDisplayName();

      this.recalculateEntries();
    });
  }

  employeeChange(selectedEmployee) {
    if (selectedEmployee) {
      this.selectedEmployee = selectedEmployee;
      this.recalculateEntries();
    }
  }
}
