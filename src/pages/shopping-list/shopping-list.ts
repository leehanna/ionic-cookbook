import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.ingredients = this.slService.getList();
  }

  onAddItem(form: NgForm) {
    const name = form.value.ingredientName;
    const amount = form.value.amount;
    this.slService.addIngredient(name, amount);
    form.reset();
    this.ingredients = this.slService.getList();
  }

  onRemoveItem(index: number) {
    this.slService.removeIngredient(index);
    this.ingredients = this.slService.getList();
  }

  onPopover(event: MouseEvent) {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) return;
        if (data.action == 'load') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      if (list) {
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
                      }
                      loader.dismiss();
                    },
                    error => {
                      loader.dismiss();
                      this.handleError(error);
                    }
                  );
              }
            );
        } else if (data.action == 'save') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => loader.dismiss(),
                    error => {
                      loader.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        } else if (data.action == 'logout') {
          this.authService.logout();
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
