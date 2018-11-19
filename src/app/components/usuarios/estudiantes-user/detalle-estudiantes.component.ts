import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-detalle-estudiantes',
  templateUrl: './detalle-estudiantes.component.html',
  styleUrls: ['./detalle-estudiantes.component.css']
})

export class DetalleEstudiantesComponent {

  public estudiante: Estudiante;
  public error: boolean;
  public mensajeError: string;
  public cargo:boolean = false;

  constructor(private _estudianteService:EstudianteService,
              private activatedRoute:ActivatedRoute) { 

     //se validan los parametros enviados por la url
     this.activatedRoute.parent.params.subscribe( params => {
      this.getEstudiante( params['codigo'] );
    });

  }

  getEstudiante(codigo:string){
    this._estudianteService.getEstudiante(codigo).subscribe( (estudianteDB:Estudiante) => {
      
      this.estudiante = estudianteDB;
      this.cargo = true;

    }, (errorService) => {
      
      //manejo de errores
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


}
