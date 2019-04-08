import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NegocioPage } from './negocio';

@NgModule({
  declarations: [
    NegocioPage,
  ],
  imports: [
    IonicPageModule.forChild(NegocioPage),
  ],
})
export class NegocioPageModule {}
