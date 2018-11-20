import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Invitado } from '../models/invitado.model';

@Injectable()

export class InvitadoService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  private invitados:Invitado[];

  constructor(private http:HttpClient,
              private router:Router,
              private _userService:UserService) { 
    
    //se valida si el usuario actual esta logueado en el sistema
    if(!this._userService.isLogged()){
      this.router.navigateByUrl('/login');
    }
              
  }

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

  // Método que solicita al api todos los invitados registrados en la base de datos
  public getInvitados(){
    return this.http.get<Invitado[]>(`${this.url}/invitados`,this.getHeaders()).pipe( map( (invitadosDB:Invitado[]) => {
        this.invitados = invitadosDB['invitadosDB'];
        return this.invitados;
    }));
  }

}
