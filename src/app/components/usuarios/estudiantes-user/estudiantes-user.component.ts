import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes-user',
  templateUrl: './estudiantes-user.component.html'
})
export class EstudiantesUserComponent implements OnInit {

  public estudiantes: Estudiante [];
  
  // Manejo de errores - alerts 
  public mensajeError: string;
  public alertClosed: boolean = false;
  public type:string;

  
  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _estudianteService:EstudianteService,
              private router: Router) {}

  ngOnInit() {
    
    //get a todos los estudiantes registrados
    this._estudianteService.getEstudiantes().subscribe((estudiantesDB:Estudiante[]) => {

      this.estudiantes = estudiantesDB;

    }, (errorService) => {

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 400){

        //si se prensenta un error se muestra una alerta en la vista
        this.mensajeError = errorService.error.message;        
        this.alertClosed = true;
        this.type = "danger";
        setTimeout(() => this.alertClosed = false, 7000);

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.message;
        this.mensajeError += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 8000);

      }

    });

  }   

}
