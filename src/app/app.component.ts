import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyBGIFqptdvnE1Q7EzOqHPfRTzQmoIJuF6U",
      authDomain: "ionic-cookbook.firebaseapp.com",
      databaseURL: "https://ionic-cookbook.firebaseio.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.rootPage = TabsPage;
        console.log(user);
      } else {
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
