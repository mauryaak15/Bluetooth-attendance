import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController,
  ActionSheetController
} from "ionic-angular";
import { ApiResponse } from "../../model/apiResponse/apiResponse.model";
import { DataServiceProvider } from "../../providers/data-service/data-service";
import 'rxjs/add/operator/take';

/**
 * Generated class for the ListSubjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-list-subjects",
  templateUrl: "list-subjects.html"
})
export class ListSubjectsPage implements OnInit {
  response = {
    data: [{
      sub_name: '',
      section_name: '',
      branch_name: '',
      year: ''
    }]
  } as ApiResponse;
  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("t_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else{
      this.getSubjects();
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController, private data: DataServiceProvider, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController) {}

  async getSubjects(){
    let loader: Loading;
    let title: string;
    let subTitle: string;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    await this.data.getsubjects().take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status){
        this.response = data;
        console.log(data);        
      }else{
        title = data.message;        
        if(data.message == 'Token expired. Please login again.' || data.message == 'Token not found.'){
          subTitle = "Loggin you out!";
        }else if(data.message == 'No subjects are found.'){
          subTitle = "Please add some subjects.";
        }
        this.presentAlert(title, subTitle);
      }
    }, err => console.log(err));
  }

  navigateToAddSubjectPage(){
    this.navCtrl.push('AddSubjectPage');
  }

  showDialog(sub){
    this.presentActionSheet(sub);
  }

  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present().then(() => {
      if(title == 'Token expired. Please login again.' || title == 'Token not found.'){
        localStorage.clear();
        // this.navCtrl.setRoot('LoginPage');
        location.reload(true);
      }
    });
  }

  presentActionSheet(sub) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose option',
      buttons: [
        {
          text: 'Take Attendance',
          handler: () => {
            console.log('take attendance');
            console.log(sub);
            this.navCtrl.push('TakeAttendancePage', {sub});
          }
        },
        {
          text: 'Show attendance',
          handler: () => {
            console.log('Show attendance');
            console.log(sub);
          }
        },
        {
          text: 'Manual Entry',
          handler: () => {
            console.log('Manaul Entry');
            console.log(sub);
          }
          },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  ionViewDidLoad() {
  }
}
