import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class LoginService {

  private url:string = 'http://localhost:3000'; 

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded', 
        'Access-Control-Allow-Origin' : '*'
      }) 
  }

  constructor(private http: HttpClient) {}

  public getLogin(loginObj: Usuario){

    let body = `email=${loginObj.email}&password=${loginObj.password}`;
    return this.http.post<Usuario>(`${this.url}/login`, body , this.httpOptions);

  }



}