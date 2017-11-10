import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ActionSheetController,
  Loading
} from "ionic-angular";
import { DataServiceProvider } from "../../providers/data-service/data-service";
import { ApiResponse } from "../../model/apiResponse/apiResponse.model";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";

/**
 * Generated class for the TakeAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-take-attendance',
  templateUrl: 'take-attendance.html',
})
export class TakeAttendancePage implements OnInit { 
  sub = this.navParams.get('sub');
  response = {
    status: false,
    data: [{
      name: '',
      enroll_no: '',
      mac_id: ''
    }]
  } as ApiResponse;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  presentDevices: any;
  gettingData: Boolean;
  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("t_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else{
      this.getStudents();
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController, private data: DataServiceProvider, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private bluetoothSerial: BluetoothSerial) {
    bluetoothSerial.enable().then((success) =>{ }, (err) => {
      this.presentAlert('Please turn on your bluetooth and try again.', '');
      this.navCtrl.pop();
    }); 
  }

  async getStudents(){
    this.gettingData = true;
    let loader: Loading;
    let title: string;
    let subTitle: string;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    await this.data.getstudents(this.sub.section_id).take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status){
        this.gettingData = false;
        this.response = data;
        console.log(data);        
      }else{
        title = data.message;        
        if(data.message == 'Token expired. Please login again.' || data.message == 'Token not found.'){
          subTitle = "Loggin you out!";
        }else if(data.message == 'No students found.'){
          subTitle = "Please add students' data first.";
        }
        this.presentAlert(title, subTitle);
      }
    }, err => console.log(err)); 
  }

  startScanning() {
    this.bluetoothSerial.isEnabled().then((success) => {
      this.pairedDevices = null;
      this.unpairedDevices = null;
      this.presentDevices = [];
      this.gettingDevices = true;
      this.bluetoothSerial.discoverUnpaired().then((success) => {
        this.unpairedDevices = success;
        this.gettingDevices = false;
        console.log(JSON.stringify(this.unpairedDevices));        
        this.unpairedDevices = this.unpairedDevices.map((res) => ({
          mac_id: res.id
        }));
        if(this.response.data.length > 0){
          let match = false;
           this.response.data.forEach(ele => {
             match = false;
            this.unpairedDevices.forEach(element => {
              if(element.mac_id == ele.mac_id){
                match = true;
              }
            });
            if(this.unpairedDevices.length){
              if(match){
                this.presentDevices.push({name: ele.name, mac_id: ele.mac_id, enroll_no: ele.enroll_no, flag: 1});                              
              }else{
                this.presentDevices.push({name: ele.name, mac_id: ele.mac_id, enroll_no: ele.enroll_no, flag: 0});                              
              }
            }else{
              this.presentDevices.push({name: ele.name, mac_id: ele.mac_id, enroll_no: ele.enroll_no, flag: 0});
            }
            
          });
        }
        console.log(JSON.stringify(this.presentDevices));
        // this.totalDevices = this.unpairedDevices.filter((device) =>{
        //   if(this.pairedDevices != null){
        //     this.pairedDevices.forEach(element => {
        //       if(element.mac_id == device.mac_id){
        //         return false;
        //       }
        //     });
        //     return true;
        //   }
        // });
        // this.pairedDevices.forEach(element => {
        //   this.totalDevices.push(element);
        // });

      },
        (err) => {
          this.presentAlert('Please turn on your bluetooth and try again.', '');
          this.navCtrl.pop();
          console.log(err);
        })
  
      // this.bluetoothSerial.list().then((success) => {
      //   this.pairedDevices = success;
      //   this.pairedDevices = this.pairedDevices.map((res) => ({
      //     mac_id: res.id
      //   }));
      //   console.log(JSON.stringify(this.pairedDevices));                
      // },
      //   (err) => {
  
      //   })
    }, (error) => {
      this.bluetoothSerial.enable().then((success) =>{
        this.startScanning();
      });
    });
    
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

}
