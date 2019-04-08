import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {apiUrl} from "../../app/global";

var httpOptions_ = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('_t')
  })
};
@Injectable()
export class NegociosProvider {

  constructor(public http: HttpClient) {
    this.actualizartoken();
  }

  actualizartoken() {
    httpOptions_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('_t')
      })
    };
  }

  promociones(id): Observable<any> {
    this.actualizartoken();
    return this.http.get(apiUrl + "negocioPromos/" + id, httpOptions_);
  }

  menu(id): Observable<any> {
    this.actualizartoken();
    return this.http.get(apiUrl + "negocioMenu/" + id, httpOptions_);
  }

  promocionesG(): Observable<any> {
    this.actualizartoken();
    return this.http.get(apiUrl + "promosGlobales", httpOptions_);
  }

  cupones(id): Observable<any> {
    this.actualizartoken();
    return this.http.get(apiUrl + "negocioCupones/" + id, httpOptions_);
  }

  nuevoComentario(data, id): Observable<any> {
    this.actualizartoken();
    return this.http.post(apiUrl + "nuevoComentarioN/" + id, JSON.stringify(data), httpOptions_);
  }

  comentarios(id): Observable<any> {
    this.actualizartoken();
    return this.http.get(apiUrl + "comentariosN/" + id, httpOptions_);
  }

  editarComentario(data, id): Observable<any> {
    this.actualizartoken();
    return this.http.post(apiUrl + "editarComentarioN/" + id, JSON.stringify(data), httpOptions_);
  }
  todosNegoc():Observable<any>{
    this.actualizartoken();
    return this.http.get(apiUrl+"negociosGlobales",httpOptions_);
  }
}
