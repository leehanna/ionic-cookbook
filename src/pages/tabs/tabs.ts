import { Component, OnInit } from '@angular/core';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';
import { ToastController, PopoverController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = ShoppingListPage;
  tab2Root = RecipesPage;

  constructor(private toastCtrl: ToastController) {

  }

  ngOnInit() {
    const toast = this.toastCtrl.create({
      message: 'Welcome user!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
}
