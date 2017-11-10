import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeAttendancePage } from './take-attendance';

@NgModule({
  declarations: [
    TakeAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(TakeAttendancePage),
  ],
})
export class TakeAttendancePageModule {}
