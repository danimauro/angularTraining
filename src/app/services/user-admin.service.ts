import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Usuario } from '../models/usuario.model';

@Injectable()

export class UserAdminService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  public usuario:Usuario;

  constructor(private http: HttpClient, 
              private router: Router,
              private _userService:UserService) {

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

  // Este metodo devuelve un observable con los datos de los usaurio registrados como administradores
  getUserAdmins(){

    return this.http.get<Usuario>(`${this.url}/usuarios`, this.getHeaders())
                    .pipe( map( (usuario:Usuario) => {
                      
                      this.usuario = usuario['usuarioDB'];
                      return this.usuario;

                    }));

  }

}
