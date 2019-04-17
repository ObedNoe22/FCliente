import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NegociosProvider} from "../../providers/negocios/negocios";
import {NegocioPage} from "../negocio/negocio";
import {
  GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, GoogleMapsMapTypeId,
  Marker
} from "@ionic-native/google-maps";
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
  marcadores :any[][] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loaderCtrl: LoadingController, private toastCtrl: ToastController,
              private negocioProv: NegociosProvider, private geolocation: Geolocation, private negProv: NegociosProvider) {
  }

  ionViewWillEnter() {
    this.pos = 0;
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
      this.map.setCameraZoom(10);
      this.map.addMarker({
        position: this.pos,
        title: "Aqui estas",
        icon: 'red',
        animation: 'DROP',
      });
    } else {
      this.map.clear();
      this.map.setCameraTarget(this.pos);
      this.map.setCameraZoom(10);
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
        this.marcadores=[];
        let tneg = result.negocios;
        for (let f = 0; f < tneg.length; f++) {
          let nombre = tneg[f].nombre;
          let direccion=tneg[f].direccion;
          let coords={lat:tneg[f].latitud,lng:tneg[f].longitud};
          let id=tneg[f].id;
          let neg=[[nombre,coords,id,direccion]];
          this.marcadores.push(neg);
        }
        this.marcadoresA();
      }
      else {
        this.toastCtrl.create({
          message: "No se han encontrado negocios.",
          duration: 3000
        }).present();
      }
    });
  }

  marcadoresA() {
    for (let i=0;i<this.marcadores.length;i++){
      this.negocioProv.comentarios(this.marcadores[i][0][2]).subscribe((data) => {
        this.map.addMarker({
          position:this.marcadores[i][0][1],
          icon: 'blue',
          draggable:true,
          title:this.marcadores[i][0][0],
          snippet:"Direccion: "+this.marcadores[i][0][3]+"\nPuntuacion: "+ data.promedio,
          clickeable:true
        }).then((marcador:Marker)=>{
          marcador.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
            marcador.showInfoWindow();
          });
          marcador.on(GoogleMapsEvent.INFO_CLICK).subscribe(()=>{
            this.negocio(this.marcadores[i][0][2]);
          })
        });
      });
    }
  }

  negocio(id) {
    this.navCtrl.push(NegocioPage, {
      idNeg: id
    });
  }

}
