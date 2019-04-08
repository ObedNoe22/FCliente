import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NegociosProvider} from "../../providers/negocios/negocios";
import {ModalCalificarPage} from "../modal-calificar/modal-calificar";

/**
 * Generated class for the NegocioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-negocio',
  templateUrl: 'negocio.html',
})
export class NegocioPage {
  id: any;
  promos: any = [];
  nombre: any;
  menu: any = [];
  seleccion: string = "promociones";
  cuponesT: any = [];
  calificacion: any = {
    id: "",
    puntuacion: 1,
    comentario: ""
  }
  puntuacion: any;
  comentarios: any = [];
  miId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private negProv: NegociosProvider,
              private loader: LoadingController, private modalController: ModalController, private toast: ToastController) {
    this.id = navParams.get('idNeg');
    this.miId = localStorage.getItem('id');
    this.buscarP();
  }

  buscarP() {
    const loader = this.loader.create({
      content: "Obteniendo resultados..."
    });
    loader.present();
    this.negProv.promociones(this.id).subscribe((result) => {
      if (result.estado) {
        this.promos = result.promociones;
        this.nombre = result.negocio;
        loader.dismiss();
      }
    });
  }

  buscarM() {
    const loader = this.loader.create({
      content: "Obteniendo resultados..."
    });
    loader.present();
    this.negProv.menu(this.id).subscribe((result) => {
      if (result.estado) {
        this.menu = result.menu;
        loader.dismiss();
      }
    });
  }

  cupones() {
    const loader = this.loader.create({
      content: "Obteniendo resultados..."
    });
    loader.present();
    this.negProv.cupones(this.id).subscribe((result) => {
      this.cuponesT = result;
      loader.dismiss()
    })
  }

  calificar() {
    const modal = this.modalController.create(ModalCalificarPage, {
      nombre: this.nombre,
      puntuacion: 0,
      comentario: ""
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data !== undefined) {
        this.calificacion = data.calif;
        this.calificacion.id = localStorage.getItem('id');
        const loader = this.loader.create({
          content: "Publicando comentario..."
        });
        loader.present();
        this.negProv.nuevoComentario(this.calificacion, this.id).subscribe((result) => {
          if (result.estado) {
            let message = "Comentario publicado con exito";
            // Mostrar Toast
            this.toast.create({
              message: message,
              duration: 4000
            }).present();
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
    })
  }

  verComentarios() {
    const loader = this.loader.create({
      content: "Obteniendo resultados..."
    });
    loader.present();
    this.negProv.comentarios(this.id).subscribe((result) => {
      this.comentarios = result.comentarios;
      this.puntuacion = Number(result.promedio.toFixed(2));
      loader.dismiss()
    })
  }

  editarCom(data) {
    const modal = this.modalController.create(ModalCalificarPage, {
      nombre: this.nombre,
      puntuacion: data.puntuacion,
      comentario: data.comentario
    });
    modal.present();
    modal.onDidDismiss((datos) => {
      if (datos !== undefined) {
        this.calificacion = datos.calif;
        this.negProv.editarComentario(this.calificacion, data.id).subscribe((result) => {
          const loader = this.loader.create({
            content: "Editando comentario..."
          });
          loader.present();
          if (result) {
            let message = "Comentario editado con exito";
            // Mostrar Toast
            this.toast.create({
              message: message,
              duration: 4000
            }).present();
            this.verComentarios();
          } else {
            let message = "Error al editar el comentario";
            // Mostrar Toast
            this.toast.create({
              message: message,
              duration: 4000
            }).present();
          }
          loader.dismiss();
        })
      }
    })
  }
}
