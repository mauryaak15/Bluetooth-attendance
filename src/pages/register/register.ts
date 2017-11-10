import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  ToastController
} from "ionic-angular";
import { User } from "../../model/user/user.model";
import { AuthService } from "../../providers/auth/auth.service";
import 'rxjs/add/operator/take';
import { ApiResponse } from "../../model/apiResponse/apiResponse.model";


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {
    name: '',
    email: '',
    password: ''
  } as User;
  constructor(private navCtrl: NavController, private auth: AuthService, private loading: LoadingController, private toastCtrl: ToastController) {
  
  }

  register(){
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    this.auth.register(this.user).take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      this.createToast(data.message).present();
      if(data.status){
        this.navCtrl.setRoot('LoginPage');
      }
    }, err => console.log(err));
  }

  createToast(msg: string) {
    return this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
