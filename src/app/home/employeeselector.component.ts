import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cc-employee-selector',
  template: `
<span>Employee:</span>
<select [ngModel]="selectedEmployee" (ngModelChange)="onChange($event)">
  <option *ngFor="let name of names" [value]="name">
    {{name}}
  </option>
</select>
  `,
  styles: [`
:host {
  margin-top: 20px;
  padding: 10px;
  display: block;
  border: 1px solid black;
}
span {
  margin-right: 15px;
}  
  `],
})
export class EmployeeSelectorComponent implements OnInit {
  @Input() names: string[];
  @Input() selectedEmployee: string;
  @Output() employeeChange = new EventEmitter();

  constructor() {
    // Do stuff
  }

  onChange(value) {
    this.employeeChange.emit(value);
  }

  ngOnInit() {

  }
}