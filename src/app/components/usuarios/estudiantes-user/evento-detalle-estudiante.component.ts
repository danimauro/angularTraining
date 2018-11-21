import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../../services/evento.service'
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-evento-detalle-estudiante',
  templateUrl: './evento-detalle-estudiante.component.html'
})

export class EventoDetalleEstudianteComponent  {

  public eventoEstudiante: Evento[];
  public cargo:boolean = false;

  //alert
  public alertClosed: boolean = false;
  public type:string;
  public mensajeError:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(public _eventoService:EventoService,
              public _activatedRoute:ActivatedRoute,
              public router:Router) { 
     //se validan los parametros enviados por la url
     this._activatedRoute.parent.params.subscribe( params => {
      this.getEventosXestudiante( params['codigo'] );
    });
  }

  getEventosXestudiante(codigo:string){

    this._eventoService.getEventosXestudiante(codigo).subscribe( (eventosXestudiante:Evento[]) => {

      this.eventoEstudiante = eventosXestudiante;

      if(this.eventoEstudiante.length == 0){

        this.alertClosed = true;
        this.type = "info";
        this.mensajeError = "Estudiante sin eventos asignados";

      }else{

        this.cargo = true;

      }
      
    }, (errorService) => {

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){
        
        this.alertClosed = true;
        this.type = "danger";
        this.mensajeError = "Error al comunicarse con el servidor"; 

      }else if(errorService.status == 401){

        this.alertClosed = true;
        this.type = "danger";
        this.mensajeError = this.mensajeError = errorService.error.message;
        this.mensajeError += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 9000);

      }

    });
    
  };

}
