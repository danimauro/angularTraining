import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class LoginService {

  // Variables privadas del servicio
  private url:string = 'http://localhost:3000'; 
  private usuarioLogin:Usuario;

    // se inyectan los servicios que se van a usar
  constructor(private http: HttpClient, 
              private _userService:UserService) {}
  
  // Se definen los headers de la petición de login 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded', 
      'Access-Control-Allow-Origin' : '*'
    }) 
  }
  
  // Ese metodo devuelve un observable con los datos del usuario autenticado en la base de datos
  public getLogin(loginObj: Usuario){

    // Se define el cuerpo de la petición
    let body = `email=${loginObj.email}&password=${loginObj.password}`;

    // Se crea la petición POST 
    return this.http.post<Usuario>(`${this.url}/login`, body , this.httpOptions).pipe( 
      map((data:Usuario) => {

        // Cuando retorna el usuario autenticado del back-end se guarda en una variable de tipo Usuario
        this.usuarioLogin = data['usuarioDB'];
        this.usuarioLogin.token = data.token;

        // Guarda en el localStorage los datos del usuario autenticado
        this._userService.setUserLoggedIn(this.usuarioLogin);

        // Retorna usuario autenticado
        return this.usuarioLogin;
        
      }));

  }



}