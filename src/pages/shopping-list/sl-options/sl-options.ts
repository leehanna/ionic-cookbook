import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-sl-options',
  template: `
    <ion-list>
      <button ion-item (click)="onAction('load')">Load Data</button>
      <button ion-item (click)="onAction('save')">Save Data</button>
      <button ion-item (click)="onAction('logout')">Logout</button>
    </ion-list>
  `
})

export class SLOptionsPage {
  constructor(private viewCtrl: ViewController) {}
  onAction(action: string) {
    this.viewCtrl.dismiss({action: action});
  }
}
