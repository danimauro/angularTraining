import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Organizacion } from '../models/organizacion.model';
import { Router } from '@angular/router';

@Injectable()

export class OrganizacionService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  private organizaciones:Organizacion [];

  constructor(private http:HttpClient,
              private _userService:UserService,
              private router:Router) { 
    
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

  getOrganizaciones(){
    return this.http.get<Organizacion[]>(`${this.url}/organizaciones`, this.getHeaders()).pipe( map( (organizacionesDB: Organizacion[]) => {

      return this.organizaciones = organizacionesDB['organiDB'];

    }));
  }
}
