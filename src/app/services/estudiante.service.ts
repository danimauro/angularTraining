import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { UserService } from './user.service';

@Injectable()
export class EstudianteService {

  private url:string = 'http://localhost:3000'; 
  public usuarioLogueado:Usuario;

  constructor(private http: HttpClient, private _userService:UserService) {
    this.usuarioLogueado = this._userService.getUserLoggedIn();
  }

  getEstudiantes(){

    let httpOptions = {
      headers: new HttpHeaders({
        'token': this.usuarioLogueado.token, 
        'Access-Control-Allow-Origin' : '*'
      }) 
    }
    
    return this.http.get<Usuario>(`${this.url}/estudiantes`, httpOptions);

  }

  getEstudiante(id:string){

    let httpOptions = {
      headers: new HttpHeaders({
        'token': this.usuarioLogueado.token, 
        'Access-Control-Allow-Origin' : '*'
      }) 
    }

    
    return this.http.post(`${this.url}/estudiante`, httpOptions);

  }

  getEstudianteEventos(id:string){

    let httpOptions = {
      headers: new HttpHeaders({
        'token': this.usuarioLogueado.token, 
        'Access-Control-Allow-Origin' : '*'
      }) 
    }

    return this.http.get(`${this.url}/estuevento/${ id }`, httpOptions);

  }

  putEstudiante(estudiante: Usuario, codigoEstudiante:string){
    
    let httpOptions = {
      headers: new HttpHeaders({
        'token': this.usuarioLogueado.token, 
        'Content-Type':'application/x-www-form-urlencoded', 
        'Access-Control-Allow-Origin' : '*'
      })

    }

    let body = `nombre=${estudiante.nombre}&apellido=${estudiante.apellido}&telfijo=${estudiante.telfijo}&telcel=${estudiante.telcel}&email=${estudiante.email}&edad=${estudiante.edad}`;

    return this.http.put(`${this.url}/estudiante/${ codigoEstudiante }`, body , httpOptions);


  }
  
  
  

  

}
