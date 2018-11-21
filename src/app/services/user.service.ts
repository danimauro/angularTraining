import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class UserService {
  
  private isUserLoggedIn: boolean = false;

  constructor() {}

  //Setear el user cuando se loguea, añadiendolo al localStorage del navegador
  setUserLoggedIn(user: Usuario){

    this.isUserLoggedIn = true;
   
    localStorage.setItem('token', JSON.stringify(user.token));
    localStorage.setItem('nombre', JSON.stringify(`${ user.nombre } ${user.apellido}`));

  }

  //Devolver el user de localStorage
  getUserLoggedIn() {
    //validamos si hay algun dato del usuario guardado en el localStorage
    if(!localStorage.getItem('token')){
      return false
    }
  	return JSON.parse(localStorage.getItem('token'));
  }

  //borrar usuario en sesion (cerrar sesion)
  cerrarSession(){
    this.isUserLoggedIn = false;
    localStorage.clear();
  }

  isLogged(){
    return this.isUserLoggedIn;
  }

  renovarToken(){
    localStorage.clear();
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token'));
  }

  getNombre(){
    return JSON.parse(localStorage.getItem('nombre'));
  }



}
