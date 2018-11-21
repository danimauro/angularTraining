import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../services/organizacion.service';
import { Organizacion } from '../../models/organizacion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-list-organizacion',
  templateUrl: './list-organizacion.component.html'
})

export class ListOrganizacionComponent implements OnInit {

  public formAddOrgani: FormGroup;
  public organizaciones: Organizacion [];
  public organizacion: Organizacion;
  public error:boolean = false;
  public correcto: boolean;
  public cargo:boolean;
  public mensajeError:string;
  public mensajeCorrecto:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _organizacionService:OrganizacionService,
              private _ngbModal:NgbModal) { }

  ngOnInit() {

    this.getOrganizaciones();
    
  }

  getOrganizaciones(){

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

  addOrganizacion(){
    this._organizacionService.postOrganizacion(this.formAddOrgani.value).subscribe( (data:any) => {
      
      this.correcto = true;
      this.mensajeCorrecto = data;

      //se actualiza la tabla princial con las nuevas organizaciones
      this.getOrganizaciones();
      this.formAddOrgani.reset();

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

  open(modal: NgbModal){

    this.formAddOrgani = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'descrip': new FormControl('',[Validators.required]),
      'imagen': new FormControl('')
    });

    this._ngbModal.open(modal);
  }

}
