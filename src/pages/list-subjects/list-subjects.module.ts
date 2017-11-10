import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSubjectsPage } from './list-subjects';

@NgModule({
  declarations: [
    ListSubjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSubjectsPage),
  ],
})
export class ListSubjectsPageModule {}
