import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user.service';
import { UserAdminService } from '../../../services/user-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  public usuarioAdmin: Usuario;
  public error: boolean;
  public mensajeError: string;
  
  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _userService:UserService,
              private _userAdminService:UserAdminService,
              private router:Router) {}

  ngOnInit() {

    //get a todos los usuarios con perfil de administadores registrados
    this._userAdminService.getUserAdmins().subscribe((usuarioAdminDB:Usuario) => {

      this.usuarioAdmin = usuarioAdminDB;

    }, (errorService) => {

      this.error = true;

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 400){

        this.mensajeError = errorService.error.err.message;

      }else if(errorService.status == 0 || errorService.status == 500){

        this.mensajeError = "Error en la comunicación con el servidor"

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.err.message;

      }
      
    });

  }


  //Borra el usuario del localstorage y lo redirecciona para 
  renovarToken(){

    this._userService.renovarToken();
    this.router.navigateByUrl('login');
    
  }

}
