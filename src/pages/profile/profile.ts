import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("t_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  logout(){
    let loader: Loading;
    let title: string;
    let subTitle: string;
    if(!loader){
      loader = this.loading.create({
        content: 'Logging out...'
      });
      loader.present();
    }
    localStorage.clear();
    location.reload(true);
  }

}
