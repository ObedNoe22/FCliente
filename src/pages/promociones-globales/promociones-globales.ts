import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NegociosProvider} from "../../providers/negocios/negocios";
import {NegocioPage} from "../negocio/negocio";

/**
 * Generated class for the PromocionesGlobalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones-globales',
  templateUrl: 'promociones-globales.html',
})
export class PromocionesGlobalesPage {
  promociones: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private negocProv: NegociosProvider,
              private loader: LoadingController) {
  }

  ionViewWillEnter() {
    const loader = this.loader.create({
      content: "Obteniendo resultados..."
    });
    loader.present();
    this.negocProv.promocionesG().subscribe((result) => {
      this.promociones = result;
      loader.dismiss();
    });
  }

  negocio(id) {
    this.navCtrl.push(NegocioPage, {
      idNeg: id
    })
  }
}
