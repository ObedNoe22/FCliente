import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMaps} from "@ionic-native/google-maps";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {TabsPage} from "../pages/tabs/tabs";
import {NegociosProvider} from '../providers/negocios/negocios';
import {SesionProvider} from '../providers/sesion/sesion';
import {LoginPage} from "../pages/login/login";
import {InicioPage} from "../pages/inicio/inicio";
import {NegocioPage} from "../pages/negocio/negocio";
import {RegistroPage} from "../pages/registro/registro";
import {PromocionesGlobalesPage} from "../pages/promociones-globales/promociones-globales";
import {ModalCalificarPage} from "../pages/modal-calificar/modal-calificar";


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    InicioPage,
    NegocioPage,
    RegistroPage,
    PromocionesGlobalesPage,
    ModalCalificarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    InicioPage,
    NegocioPage,
    RegistroPage,
    ModalCalificarPage,
    PromocionesGlobalesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Camera,
    Geolocation,
    GoogleMaps,
    NegociosProvider,
    SesionProvider,
  ]
})
export class AppModule {
}
