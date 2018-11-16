import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { UserService } from './user.service';

@Injectable()

export class UserAdminService {

  private url:string = 'http://localhost:3000'; 
  public usuarioLogueado:Usuario;

  constructor(private http: HttpClient, private _userService:UserService) {
    this.usuarioLogueado = this._userService.getUserLoggedIn();
  }

  getUserAdmins(){

    let httpOptions = {
      headers: new HttpHeaders({
        'token': this.usuarioLogueado.token, 
        'Access-Control-Allow-Origin' : '*'
      }) 
    }
    
    return this.http.get<Usuario>(`${this.url}/usuarios`, httpOptions);

  }

}
