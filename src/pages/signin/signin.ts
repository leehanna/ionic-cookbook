import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  form: FormGroup;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const loader = this.loadingCtrl.create({
      content: 'Signing in...'
    });
    loader.present();
    firebase.auth().signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then(data => {
        loader.dismiss();
      })
      .catch(error => {
        loader.dismiss();
        this.errorMessage = error;
      });
  }

  onGoToSignup() {
    this.navCtrl.push(SignupPage);
  }

}
