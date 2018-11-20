import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../services/organizacion.service';
import { Organizacion } from '../../models/organizacion.model';

@Component({
  selector: 'app-list-organizacion',
  templateUrl: './list-organizacion.component.html',
  styleUrls: ['./list-organizacion.component.css']
})

export class ListOrganizacionComponent implements OnInit {

  public organizaciones: Organizacion [];
  public error:boolean = false;
  public mensajeError:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _organizacionService:OrganizacionService) { }

  ngOnInit() {

    this._organizacionService.getOrganizaciones().subscribe( (organizacionesDB:Organizacion[]) => {
      this.organizaciones = organizacionesDB;
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
