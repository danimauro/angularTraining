import { Component, OnInit } from '@angular/core';
import { InvitadoService } from '../../services/invitado.service';
import { Invitado } from '../../models/invitado.model';

@Component({
  selector: 'app-invitados',
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.css']
})

export class InvitadosComponent implements OnInit {

  public invitados: Invitado[];
  public error:boolean = false;
  public mensajeError:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc"

  constructor(private _invitadoService:InvitadoService) { }

  ngOnInit() {

    this._invitadoService.getInvitados().subscribe( (invitadosDB:Invitado[]) => {

      this.invitados = invitadosDB;

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
