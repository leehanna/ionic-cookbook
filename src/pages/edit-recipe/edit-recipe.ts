import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  form: FormGroup;
  originalRecipe: Recipe;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      const index = this.navParams.get('index');
      this.originalRecipe = this.recipeService.getRecipe(index);
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = this.selectOptions[0];
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.originalRecipe.title;
      description = this.originalRecipe.description;
      difficulty = this.originalRecipe.difficulty;
      for (var i = 0; i < this.originalRecipe.ingredients.length; i++) {
        const ingredient = this.originalRecipe.ingredients[i];
        ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name),
          amount: new FormControl(ingredient.amount)
        }));
      }
    }

    this.form = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingName': new FormControl(null),
      'ingAmount': new FormControl(null),
      'ingredients': new FormArray(ingredients, Validators.required)
    });
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      name: new FormControl(this.form.get('ingName').value, Validators.required),
      amount: new FormControl(this.form.get('ingAmount').value, Validators.required)
    }));
    const toast = this.toastCtrl.create({
      message: 'New ingredient was added.',
      duration: 1500
    });
    toast.present();
    this.form.get('ingName').reset();
    this.form.get('ingAmount').reset();
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).controls.splice(index, 1);
    const toast = this.toastCtrl.create({
      message: 'Ingredient was removed.',
      duration: 1500
    });
    toast.present();
  }

  onSubmit() {
    const title = this.form.get('title').value;
    const description = this.form.get('description').value;
    const difficulty = this.form.get('difficulty').value;
    let ingredients = (<FormArray>this.form.get('ingredients')).controls.map(formGroup => {
      return {name: formGroup.get('name').value, amount: formGroup.get('amount').value}
    });

    if (this.mode == 'New') {
      this.recipeService.addRecipe(title, description, difficulty, ingredients);
    } else {
      this.recipeService.updateRecipe(this.navParams.get('index'), title, description, difficulty, ingredients);
    }

    this.navCtrl.pop();
  }
}
