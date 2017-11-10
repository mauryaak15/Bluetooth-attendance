import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSubjectPage } from './add-subject';

@NgModule({
  declarations: [
    AddSubjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSubjectPage),
  ],
})
export class AddSubjectPageModule {}
