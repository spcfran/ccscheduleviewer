import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ExcelModule } from "./excel/excel.module";
import { CCScheduleModule } from "./ccscheduledata";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeSelectorComponent } from "./home/employeeselector.component";
import { ScheduleTableComponent } from "./home/scheduletable.component";
import { ApiService, SPHelperService, UtilService } from './shared';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ExcelModule,
    CCScheduleModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent, 
    EmployeeSelectorComponent,
    ScheduleTableComponent
  ],
  providers: [
    ApiService,
    SPHelperService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
