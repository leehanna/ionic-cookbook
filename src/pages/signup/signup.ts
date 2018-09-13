import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              public navCtrl: NavController) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const loader = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loader.present();
    this.authService.signup(this.form.value.email, this.form.value.password)
      .then(data => {
        loader.dismiss();
        this.errorMessage = null;
      })
      .catch(error => {
        loader.dismiss();
        this.errorMessage = error;
      });
  }

}
