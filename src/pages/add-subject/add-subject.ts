import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { DataServiceProvider } from "../../providers/data-service/data-service";
import { ApiResponse } from "../../model/apiResponse/apiResponse.model";

/**
 * Generated class for the AddSubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-subject",
  templateUrl: "add-subject.html"
})
export class AddSubjectPage implements OnInit {
  response = {
    status: false,
    data: [
      {
        section_name: "",
        branch_name: "",
        section_id: "",
        year: ""
      }
    ]
  } as ApiResponse;
  subject_name = '' as string;
  selectedSection = '' as string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private data: DataServiceProvider,
    private loading: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("t_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else{
      this.getSections();
    }
  }

  async getSections(){
    let loader: Loading;
    let title: string;
    let subTitle: string;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    await this.data.getsections().take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status){
        this.response = data;
        console.log(data);        
      }else{
        title = data.message;        
        if(data.message == 'Token expired. Please login again.' || data.message == 'Token not found.'){
          subTitle = "Loggin you out!";
        }else if(data.message == 'No sections are found.'){
          subTitle = "Please ask admin to add sections first.";
        }
        this.presentAlert(title, subTitle);
      }
    }, err => console.log(err));
  }

  async addSubject(){
    let loader: Loading;
    let title: string;
    let subTitle: string;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    await this.data.addsubject(this.subject_name, this.selectedSection).take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status){
        this.presentAlert(data.message, '');   
      }else{
        title = data.message;        
        if(data.message == 'Token expired. Please login again.' || data.message == 'Token not found.'){
          subTitle = "Loggin you out!";
        }else if(data.message == 'Subject already present.'){
          subTitle = "Please select different subject";
        }
        this.presentAlert(title, subTitle);
      }
    }, err => console.log(err));
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
      }else if(title == 'Subject added successfully'){
        this.navCtrl.setRoot('TabsPage');
      }
    });
  }

}
