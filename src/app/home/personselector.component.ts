import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cc-person-selector',
  template: `
<span>{{label}}</span>
<select [ngModel]="selectedName" (ngModelChange)="onChange($event)">
  <option *ngFor="let name of names" [value]="name">
    {{name}}
  </option>
</select>
  `,
  styles: [`
:host {
  display: block;
}
span {
  margin-right: 15px;
}  
  `],
})
export class PersonSelectorComponent implements OnInit {
  @Input() names: string[];
  @Input() label: string;
  @Input() selectedName: string;
  @Output() nameChange = new EventEmitter();

  constructor() {
    // Do stuff
  }

  onChange(value) {
    this.nameChange.emit(value);
  }

  ngOnInit() {

  }
}
