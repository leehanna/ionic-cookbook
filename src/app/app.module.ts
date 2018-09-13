import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import { SLOptionsPage } from '../pages/shopping-list/sl-options/sl-options';
import { RecipesOptionsPage } from '../pages/recipes/recipes-options/recpies-options';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    RecipesOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    RecipesOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
