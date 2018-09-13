import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptionsPage } from './recipes-options/recpies-options';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipesService: RecipeService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onAddRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onRemove(index: number) {
    this.recipesService.removeRecipe(index);
    this.recipes = this.recipesService.getRecipes();
  }

  onEdit(index: number) {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', index: index});
  }

  onViewDetails(index: number) {
    this.navCtrl.push(RecipePage, index);
  }

  onPopover(event: MouseEvent) {
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
    const loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) return;
        if (data.action == 'load') {
          loader.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
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
                this.recipesService.storeList(token)
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
    )
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
