import { Component, OnInit, Input } from '@angular/core';
import { SPHelperService, UtilService } from "../shared";
import { CCScheduleService, CCSchedule, CCScheduleEntry } from "../ccscheduledata";
import { groupBy, sortBy, keys } from "lodash";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private status = "Click button";
  private mode: "employee" | "pm" = "employee";
  private showPastWeeks: boolean = false;
  private selectedEntries: CCScheduleEntry[] = [];

  private scheduleByEmployee: ({[key: string]: CCScheduleEntry[]}) = {};
  private allEmployees = [];
  private selectedEmployee = "";

  private scheduleByPM: ({[key: string]: CCScheduleEntry[]}) = {};
  private allPMs = [];
  private selectedPM = "";
  
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
    if (this.mode == "employee") {
      this.selectedEntries = (this.scheduleByEmployee[this.selectedEmployee] || [])
        .filter(entry => this.showPastWeeks ? entry : (this._util.isSameWeek(entry.date, today) || entry.date >= today))
      ;
    }
    else {
      this.selectedEntries = (this.scheduleByPM[this.selectedPM] || [])
        .filter(entry => this.showPastWeeks ? entry : (this._util.isSameWeek(entry.date, today) || entry.date >= today))
      ; 
    }
  }

  loadSchedule() {
    this.status = "loading";
    this._ccScheduleService.loadSchedule(this.docUrl).then(schedule => {
      let allEntries = sortBy(schedule.entries, entry => entry.date);
      this.scheduleByEmployee = groupBy(allEntries, entry => entry.employee);
      this.scheduleByPM = groupBy(
        allEntries.filter(e => e.project.projectManager), 
        entry => entry.project.projectManager);
      this.allEmployees = schedule.employees;
      this.allPMs = keys(this.scheduleByPM);

      this.status = `Loaded ${allEntries.length} entries, ${this.allEmployees.length} employees, ${this.allPMs.length} PMs`;

      let currentUser = this._spHelper.getCurrentUserDisplayName();
      this.selectedEmployee = currentUser;
      this.selectedPM = currentUser;

      //If current user is a PM, they are most likely interested in PM mode
      if (this.allPMs.indexOf(currentUser) >= 0) {
        this.mode = "pm";
      }

      this.recalculateEntries();
    });
  }

  employeeChange(selectedEmployee) {
    if (selectedEmployee) {
      this.selectedEmployee = selectedEmployee;
      this.recalculateEntries();
    }
  }

  pmChange(selectedPM) {
    if (selectedPM) {
      this.selectedPM = selectedPM;
      this.recalculateEntries();
    }
  }

  modeChange(event) {
    this.recalculateEntries();
  }
}
