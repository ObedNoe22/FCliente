import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SesionProvider} from "../../providers/sesion/sesion";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario: any = {
    nombre: "",
    correo: "",
    password: "",
    rpassword: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private provSes: SesionProvider,
              private loader: LoadingController, private toast: ToastController) {
  }

  registro() {
    const loader = this.loader.create({
      content: "Registrandote..."
    });
    loader.present();
    this.provSes.registro(this.usuario).subscribe((result) => {
      console.log(result);
      if (result.estado) {
        localStorage.setItem("_t", result.detalle.token);
        localStorage.setItem("id", result.detalle.usuario.id);
        this.navCtrl.setRoot(TabsPage);
      } else {
        // Error
        let message = "";
        for (let f = 0; f < result.detalle.length; f++) {
          message += result.detalle[f] + "\n";
        }
        this.toast.create({
          message: message,
          duration: 3000
        }).present();
      }
      loader.dismiss();
    });
  }
}
