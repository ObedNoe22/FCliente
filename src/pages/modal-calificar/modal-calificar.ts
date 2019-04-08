import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalCalificarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-calificar',
  templateUrl: 'modal-calificar.html',
})
export class ModalCalificarPage {
  nombre: any;
  estrellasn:any;
  calificacion: any = {
    puntuacion:0,
    comentario: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private toast:ToastController) {
    this.nombre = navParams.get('nombre');
    this.calificacion.puntuacion=navParams.get('puntuacion');
    this.calificacion.comentario=navParams.get('comentario');
    this.estrellas();
  }

  calificar() {
    if(this.calificacion.puntuacion!==0){
      this.viewCtrl.dismiss({calif: this.calificacion});
    }else{
      let message = "La puntuacion no puede ser 0";
      // Mostrar Toast
      this.toast.create({
        message: message,
        duration: 4000
      }).present();
    }
  }

  estrellas(){
    this.estrellasn=5-this.calificacion.puntuacion;
  }
  puntuar(i) {
    this.calificacion.puntuacion=i;
  }
  cerrar(){
    this.viewCtrl.dismiss();
  }
}
