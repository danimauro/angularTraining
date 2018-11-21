import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Evento } from '../models/evento.model';
import { map } from 'rxjs/operators';

@Injectable()

export class EventoService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  private evento:Evento;
  private eventos:Evento[];

  constructor(private http:HttpClient,
              private _userService:UserService) { }

  // Se definen los headers de las peticiones, en este caso las peticiones GET
  private getHeaders(){

    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._userService.getToken(),
        'Access-Control-Allow-Origin' : '*'
      }) 
    }

    return httpOptions;

  }

  // Este metodo devuelve un observable con los datos de un estudiante relacionado con los eventos
  getEventosXestudiante(codigo:string){

    return this.http.get<Evento[]>(`${this.url}/estuevento/${ codigo }`, this.getHeaders())
                    .pipe( map( (eventosEstudiante:Evento[]) => {
                      
                        //Validar cuando la respuesta de la peticion devuelve un array sin datos
                        if(!eventosEstudiante['eventosEstudianteDB'][0]){
                          return this.eventos = [];
                        }else{
                          this.eventos = eventosEstudiante['eventosEstudianteDB'][0].eventoUsuario;
                          return this.eventos;      
                        }
                                      
                    }));

  }


}
