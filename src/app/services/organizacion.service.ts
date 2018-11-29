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
  private organizacion:Organizacion;

  constructor(private http:HttpClient,
              private _userService:UserService,
              private router:Router) { 
    
    //se valida si el usuario actual esta logueado en el sistema
    if(!this._userService.isLogged()){
      this.router.navigateByUrl('/login');
    }

  }

  // Se definen los headers de las peticiones, en este caso las peticiones GET
  private headers(){

    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._userService.getToken(),
        'Access-Control-Allow-Origin' : '*'
      }) 
    }

    return httpOptions;

  }


  getOrganizaciones(){
    return this.http.get<Organizacion[]>(`${this.url}/organizaciones`, this.headers())
                    .pipe( map( (organizacionesDB: Organizacion[]) => {
                      
                        // Validar cuando el servicio esta devolviendo un arreglo sin datos
                        if(!organizacionesDB['organiDB']){
                          return this.organizaciones = [];
                        }else{
                          return this.organizaciones = organizacionesDB['organiDB'];
                        }
                        
                    }));
  }

  getOrganizacion(codigo:string){
    return this.http.get<Organizacion>(`${this.url}/organizacion/${codigo}`, this.headers())
                    .pipe( map( (organizacionDB:Organizacion) => {

                        this.organizacion = organizacionDB['organiDB'][0];
                        return this.organizacion;

                    }));
  }

  postOrganizacion(organizacion:Organizacion){

    let data = new FormData();
    
    data.append('nombre', organizacion.nombre);
    data.append('imagen', organizacion.imagen, organizacion.imagen.name);
    data.append('descrip',organizacion.descrip);
  
    return this.http.post<Organizacion>(`${this.url}/organizacion`, data, this.headers())
                    .pipe( map( (res:any) => {
                        return res;
                    }));

  }

  putOrganizacion(organizacion:Organizacion){

    let data = new FormData();

    data.append('nombre', organizacion.nombre);
    data.append('descrip', organizacion.descrip);

    if(organizacion.imagen == null){

      data.append('imagen', organizacion.imagen, '');

    }else{

      data.append('imagen', organizacion.imagen, organizacion.imagen.name);
      
    } 

    return this.http.put<Organizacion>(`${this.url}/organizacion/${organizacion.codigo}`, data, this.headers())
                    .pipe( map( (res:any) => {
                        return res;
                    }));
  }

}
