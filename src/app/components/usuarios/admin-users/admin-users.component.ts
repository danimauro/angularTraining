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

  public usuarioLogin: Usuario;
  public usuariosAdmin: Usuario;
  public error: boolean;
  public mensajeError: string;
  
  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _userService:UserService,
              private _userAdminService:UserAdminService,
              private router:Router) { 

    if(!this._userService.getUserLoggedIn()){
      this.router.navigateByUrl('/login');
    }
  
  }

  ngOnInit() {

    //get a todos los usuarios con perfil de administadores registrados
    this._userAdminService.getUserAdmins().subscribe((data:any) => {
      this.usuariosAdmin = data.usuarioDB;
    }, (errorService) => {
      this.error = true;

      console.log(errorService);

      if(errorService.status == 0 || 500){
        this.mensajeError = "Error en la comunicación con el servidor";
      }else{
        this.mensajeError = errorService.error.err.message;
      }
    });

  }


  //Borra el usuario del localstorage y lo redirecciona para 
  renovarToken(){

    this._userService.renovarToken();
    this.router.navigateByUrl('login');
    
  }

}
