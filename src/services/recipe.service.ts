import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-cookbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes);
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-cookbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token);
  }
}
