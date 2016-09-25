import { Component, Input, ElementRef } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  docUrl: string = "-no-url-";

  constructor(private api: ApiService, public elementRef: ElementRef) {
    let native = this.elementRef.nativeElement;
    this.docUrl = native.getAttribute("docUrl");
  }
}
