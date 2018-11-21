import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-detalle-estudiantes',
  templateUrl: './detalle-estudiantes.component.html',
  styleUrls: ['./detalle-estudiantes.component.css']
})

export class DetalleEstudiantesComponent {

  public estudiante: Estudiante;
  public mensajeError: string;
  public cargo:boolean = false;

  //alert
  public alertClosed: boolean = false;
  public type:string;

  constructor(private _estudianteService:EstudianteService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { 

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
      

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 400){

        //si se prensenta un error se muestra una alerta en la vista
        this.mensajeError = errorService.error.message; 
        this.alertClosed = true;
        this.type = "danger";
        setTimeout(() => this.alertClosed = false, 5000);

      }else if(errorService.status == 0 || errorService.status == 500){

        this.mensajeError = "Error en la comunicación con el servidor"
        this.alertClosed = true;
        this.type = "danger";
        setTimeout(() => this.alertClosed = false, 5000);

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.message;
        this.mensajeError += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 7000);

      }
    });
  }


}
