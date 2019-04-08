import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NegociosProvider} from "../../providers/negocios/negocios";
import {NegocioPage} from "../negocio/negocio";
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsMapTypeId} from "@ionic-native/google-maps";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  pos: any = 0;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loaderCtrl: LoadingController, private toastCtrl: ToastController,
              private negocioProv: NegociosProvider, private geolocation: Geolocation) {
  }

  ionViewWillEnter() {
    this.pos=0;
    const loader = this.loaderCtrl.create({
      content: "Obteniendo ubicacion..."
    });
    loader.present();
    let watch = this.geolocation.watchPosition();
    loader.dismiss();
    watch.subscribe((data) => {
      this.pos = {lat: data.coords.latitude, lng: data.coords.longitude};
      this.initMap();
    });
  }

  initMap() {
    const loader = this.loaderCtrl.create({
      content: "Iniciando mapa"
    });
    if (this.map == null) {
      let mapOptions: GoogleMapOptions = {
        mapType: GoogleMapsMapTypeId.ROADMAP
      };
      loader.present();
      this.map = GoogleMaps.create(document.getElementById('map_canvas'), mapOptions);
      this.map.setCameraTarget(this.pos);
      this.map.setCameraZoom(18);
      this.map.addMarker({
        position: this.pos,
        title: "Aqui estas",
        icon: 'red',
        animation: 'DROP',
      });
    } else {
      this.map.clear();
      this.map.setCameraTarget(this.pos);
      this.map.setCameraZoom(18);
      this.map.addMarker({
        position: this.pos,
        title: "Aqui estas",
        icon: 'red',
        animation: 'DROP',
      });
    }
    loader.dismiss();
    this.negocioProv.todosNegoc().subscribe((result) => {
      if (result.estado) {
        let tneg=result.negocios;
        for (let f = 0; f < tneg.length; f++) {
          let coords={lat: tneg[f].latitud, lng: tneg[f].longitud};
          let nombre=tneg[f].nombre;
          this.marcadores(coords,nombre);
        }
        console.log(result);
      }
      else {
        this.toastCtrl.create({
          message: "No se han encontrado negocios.",
          duration: 3000
        }).present();
      }
    });
  }
marcadores(cordenadas,nombre){
  this.map.addMarker({
    position: cordenadas,
    title: nombre,
    icon: 'blue',
    animation: 'DROP',
  });
}
  negocio(id) {
    //TODO quitar al poner el mapa
    id = 13;
    this.navCtrl.push(NegocioPage, {
      idNeg: id
    });
  }

}
