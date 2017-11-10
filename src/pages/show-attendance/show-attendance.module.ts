import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAttendancePage } from './show-attendance';

@NgModule({
  declarations: [
    ShowAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAttendancePage),
  ],
})
export class ShowAttendancePageModule {}
