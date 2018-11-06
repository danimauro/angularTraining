import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes-user',
  templateUrl: './estudiantes-user.component.html',
  styleUrls: ['./estudiantes-user.component.css']
})
export class EstudiantesUserComponent implements OnInit {

  public usuarioLogin: Usuario;
  public estudiantes: Usuario[];
  public error: boolean;
  public mensajeError: string;
  
  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _userService:UserService, 
              private _estudianteService:EstudianteService,
              private router: Router) { 
    
    if(!this._userService.getUserLoggedIn()){
      this.router.navigateByUrl('/login');
    }

    this.usuarioLogin = this._userService.getUserLoggedIn();
  }

  ngOnInit() {
    //get a todos los estudiantes registrados que se encuentren activos en el sistema
    this._estudianteService.getEstudiantes().subscribe((data:any) => {
      this.estudiantes = data.usuarioDB;
    }, (errorService) => {
      this.error = true;
      this.mensajeError = errorService.error.err.message;
    });

  }

  //get a solo el estudiante registrado
  getEstudiante(estudiante:Usuario){
    
    this.router.navigate(['estudiupdate', estudiante.id ]);

  }
  //Borra el usuario del localstorage y lo redirecciona para 
  renovarToken(){

    this._userService.renovarToken();
    this.router.navigateByUrl('login');
    
  }


  


}
