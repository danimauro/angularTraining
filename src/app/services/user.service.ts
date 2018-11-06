import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class UserService {
  
  private isUserLoggedIn: boolean = false;
  private usserLogged:Usuario;

  constructor() {}

  //Setear el user cuando se loguea, añadiendolo al localStorage del navegador
  setUserLoggedIn(user:Usuario){

    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('userActual', JSON.stringify(user));

  }

  //Devolver el user de localStorage
  getUserLoggedIn() {
    //validamos si hay algun dato del usuario guardado en el localStorage
    if(!localStorage.getItem('userActual')){
      return false
    }
  	return JSON.parse(localStorage.getItem('userActual'));
  }

  //borrar usuario en sesion (cerrar sesion)
  cerrarSession(){
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    localStorage.clear();
  }

  isLogged(){
    return this.usserLogged;
  }

  renovarToken(){
    localStorage.clear();
  }


}
