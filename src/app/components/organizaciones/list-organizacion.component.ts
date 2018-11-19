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
    });
  }

}
