import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../services/evento.service'
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-evento-detalle-estudiante',
  templateUrl: './evento-detalle-estudiante.component.html'
})

export class EventoDetalleEstudianteComponent  {

  
  public eventoEstudiante:Evento;
  public error:boolean = false;
  public mensajeError:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(public _eventoService:EventoService,
              public _activatedRoute:ActivatedRoute ) { 
     //se validan los parametros enviados por la url
     this._activatedRoute.parent.params.subscribe( params => {
      this.getEventosXestudiante( params['codigo'] );
    });
  }

  getEventosXestudiante(codigo:string){
    this._eventoService.getEventosXestudiante(codigo).subscribe( (eventosXestudiante:Evento) => {

      this.eventoEstudiante = eventosXestudiante;

    }), (errorService) => {
      //manejo de errores
      this.error = true;

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 400){

        this.mensajeError = errorService.error.err.message;

      }else if(errorService.status == 0 || errorService.status == 500){

        this.mensajeError = "Error en la comunicación con el servidor"

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.err.message;

      };

    }
    
  };

}
