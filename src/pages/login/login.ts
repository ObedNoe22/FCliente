import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegistroPage} from "../registro/registro";
import {SesionProvider} from "../../providers/sesion/sesion";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: any = {
    nombre: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private provSes: SesionProvider,
              private loader: LoadingController, private toast: ToastController) {
    const tok = localStorage.getItem('_t');
    if (tok !== null && tok !== undefined) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  inicio() {
    const loader = this.loader.create({
      content: "Iniciando sesion..."
    });
    loader.present();
    this.provSes.login(this.usuario).subscribe((result) => {
      if (result.estado) {
        if (result.rol == 0) {
          if (result.estadoC == 0) {
            let message = "Confirmar cuenta por correo."
            // Mostrar Toast
            this.toast.create({
              message: message,
              duration: 4000
            }).present();
          } else {
            localStorage.setItem("_t", result.detalle);
            localStorage.setItem("id", result.id);
            this.navCtrl.setRoot(TabsPage);
          }
        } else {
          let message = "Este usuario parece no estar registrado, verifíquelo antes de continuar."
          // Mostrar Toast
          this.toast.create({
            message: message,
            duration: 4000
          }).present();
        }
      } else {
        let message = "";
        for (let f = 0; f < result.detalle.length; f++) {
          message += result.detalle[f] + "\n";
        }
        // Mostrar Toast
        this.toast.create({
          message: message,
          duration: 4000
        }).present();
      }
      loader.dismiss();
    });
  }

  registro() {
    this.navCtrl.push(RegistroPage);
  }
}
