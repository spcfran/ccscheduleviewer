import { Injectable } from '@angular/core';

@Injectable()
export class SPHelperService {
  private static defaultUserName = "Tim Wallis";

  getCurrentUserDisplayName() {
    let nameNode = document.getElementById("SuiteNavUserName");
    return nameNode ? nameNode.innerText : SPHelperService.defaultUserName;
  }
}
