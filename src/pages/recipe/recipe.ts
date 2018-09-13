import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipeService: RecipeService,
              private slService: ShoppingListService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.index = this.navParams.data;
    this.recipe = this.recipeService.getRecipe(this.index);
  }

  ionViewWillEnter() {
    this.recipe = this.recipeService.getRecipe(this.index);
  }

  onAddIngredientsToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
    const toast = this.toastCtrl.create({
      message: 'Ingredients were added to your shopping list!',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', index: this.index});
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.pop();
  }
}
