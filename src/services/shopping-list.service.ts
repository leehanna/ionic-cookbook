import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getList() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-cookbook.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients);
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-cookbook.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token);
  }
}
