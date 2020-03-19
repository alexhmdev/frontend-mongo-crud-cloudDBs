import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}
  rental() {
  location.pathname = './tabs/tab3';
  }

  house() {
    location.pathname = './tabs/tab2';
    }
  customer() {
      location.pathname = './tabs/tab1';
      }
}
