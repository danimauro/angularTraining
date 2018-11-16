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

  public estudiantes: Usuario;
  public error: boolean;
  public mensajeError: string;
  
  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _userService:UserService, 
              private _estudianteService:EstudianteService,
              private router: Router) {}

  ngOnInit() {
    
    //get a todos los estudiantes registrados
    this._estudianteService.getEstudiantes().subscribe((estudiantesDB:Usuario) => {

      this.estudiantes = estudiantesDB;

    }, (errorService) => {

      this.error = true;

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 400){

        this.mensajeError = errorService.error.err.message;

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.err.message;

      }

    });

  }  

  //get a solo el estudiante registrado
  getEstudiante(estudiante: Usuario){
    this.router.navigate(['estudiupdate', estudiante.codigo ]);
  }
  
  //Borra el usuario del localstorage y lo redirecciona para 
  renovarToken(){

    this._userService.renovarToken();
    this.router.navigateByUrl('login');
    
  }


  


}
