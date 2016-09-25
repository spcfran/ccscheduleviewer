import { Component, OnInit, Input } from '@angular/core';
import { SPHelperService } from "../shared";
import { CCScheduleService, CCSchedule, CCScheduleEntry } from "../ccscheduledata";


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private status = "Click button";
  private schedule: CCSchedule;
  private selectedEmployee = "";
  private selectedEntries: CCScheduleEntry[] = [];
  @Input() autoInit: boolean = false;
  @Input() docUrl: string = "";

  constructor(private _ccScheduleService: CCScheduleService, private _spHelper: SPHelperService) {
    // Do stuff
  }

  ngOnInit() {
    if (this.autoInit) {
      this.loadSchedule();
    }
  }

  displayScheduleForSelectedEmployee() {
    this.selectedEntries = this.schedule.entries
      .filter(entry => entry.employee == this.selectedEmployee)
      .sort((a, b) => a.date.valueOf() - b.date.valueOf()
    );
  }

  loadSchedule() {
    this.status = "loading";
    this._ccScheduleService.loadSchedule(this.docUrl).then(schedule => {
      this.schedule = schedule;

      this.status = `Loaded ${schedule.entries.length} entries for ${schedule.employees.length} employees`;

      this.selectedEmployee = this._spHelper.getCurrentUserDisplayName();

      this.displayScheduleForSelectedEmployee();
    });
  }

  employeeChange(selectedEmployee) {
    if (selectedEmployee) {
      this.selectedEmployee = selectedEmployee;
      this.displayScheduleForSelectedEmployee();
    }
  }
}
