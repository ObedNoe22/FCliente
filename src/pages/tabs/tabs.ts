import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {InicioPage} from "../inicio/inicio";
import {PromocionesGlobalesPage} from "../promociones-globales/promociones-globales";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  Inicio = InicioPage;
  Promos=PromocionesGlobalesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cerrarSesion() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }


}
