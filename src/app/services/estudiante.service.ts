import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Estudiante } from '../models/estudiante.model';
import { UserService } from './user.service';

@Injectable()
export class EstudianteService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  private estudiantes: Estudiante[];
  private estudiante: Estudiante;

  constructor(private http: HttpClient, 
              private _userService:UserService,
              private router:Router) {
    
    //se valida si el usuario actual esta logueado en el sistema
    if(!this._userService.isLogged()){
      this.router.navigateByUrl('/login');
    }

  }

  // Se definen los headers de las peticiones, en este caso las peticiones GET
  getHeaders(){

    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._userService.getToken(),
        'Access-Control-Allow-Origin' : '*'
      }) 
    }

    return httpOptions;

  }

  // Se definen los headers de las peticiones, en este caso las peticiones POST
  postHeaders(){

    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._userService.getToken(),
        'Content-Type':'application/x-www-form-urlencoded', 
        'Access-Control-Allow-Origin' : '*'
      })

    }

    return httpOptions;
    
  }

  // Este metodo devuelve un observable con los datos de los estudiantes registrados en el sistema
  getEstudiantes(){    
    
    return this.http.get<Estudiante[]>(`${this.url}/estudiantes`, this.getHeaders())
                    .pipe( map( (estudiantesDB:Estudiante[]) => {
                        return this.estudiantes = estudiantesDB['estudiantesDB'];
                    }));
  }

  // Este metodo devuelve un observable con los datos de un estudiante por medio de su codigo
  getEstudiante(codigo:string){

    return this.http.get<Estudiante>(`${this.url}/estudiante/${ codigo }`, this.getHeaders())
                    .pipe( map( (estudianteDB:Estudiante) => {
                      this.estudiante = estudianteDB['estudiantesDB'][0];
                      return this.estudiante;
                    }));

  }

  // Este metodo devuelve un observable con los datos de un estudiante relacionado con los eventos
  getEstudianteEventos(codigo:string){

    return this.http.get(`${this.url}/estuevento/${ codigo }`, this.getHeaders())
                    .pipe( map( (estueventos:any) => {
                        this.estudiantes = estueventos.eventosEstudianteDB[0];
                        return this.estudiantes;
                    }));

  }
  // Este metodo devuelve un observable indicando la actualización del estudiante
  putEstudiante(estudiante: Estudiante, codigoEstudiante:string){
    
    const body = `nombre=${estudiante.nombre}&apellido=${estudiante.apellido}
                &telfijo=${estudiante.telfijo}&telcel=${estudiante.telcel}
                &email=${estudiante.email}&edad=${estudiante.edad}`;

    return this.http.put(`${this.url}/estudiante/${ codigoEstudiante }`, body , this.postHeaders());
  }
}
