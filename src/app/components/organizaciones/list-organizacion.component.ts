import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router} from '@angular/router';
import { OrganizacionService } from '../../services/organizacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Organizacion } from '../../models/organizacion.model';

@Component({
  selector: 'app-list-organizacion',
  templateUrl: './list-organizacion.component.html'
})

export class ListOrganizacionComponent implements OnInit {

  public formAddOrgani: FormGroup;
  public organizaciones: Organizacion [];
  public organizacion: Organizacion;
  public cargo:boolean;

  //alert
  public alertClosed: boolean = false;
  public type:string;
  public mensaje:string;

  //File
  public selectedFile = null;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private _organizacionService:OrganizacionService,
              private router:Router,
              private _ngbModal:NgbModal) { }

  ngOnInit() {

    this.getOrganizaciones();

    this.formAddOrgani = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'descrip': new FormControl('',[Validators.required]),
      'imagen': new FormControl('',[Validators.required])
    });
    
  }

  getOrganizaciones(){

    this._organizacionService.getOrganizaciones().subscribe( (organizacionesDB:Organizacion[]) => {

      this.organizaciones = organizacionesDB;

      if(this.organizaciones.length == 0){

        this.alertClosed = true;
        this.type = "info";
        this.mensaje = "No hay organizaciones registradas";
        setTimeout(() => this.alertClosed = false, 5000);

      }else{

        this.cargo = true;

      }

    }, (errorService) => {
      
      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){
        
        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = "Error al comunicarse con el servidor"; 

      }else if(errorService.status == 401){

        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = errorService.error.message;
        this.mensaje += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 9000);

      }

    });

  }
  // Cargar imagen
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  addOrganizacion(){

    this.formAddOrgani.value.imagen = this.selectedFile;

    this._organizacionService.postOrganizacion(this.formAddOrgani.value).subscribe( (data:any) => {
      
      this.alertClosed = true;
      this.type = "success";
      this.mensaje = data.message;
      setTimeout(() => this.alertClosed = false, 5000);

      //Se actualiza la tabla princial con las nuevas organizaciones
      this.getOrganizaciones();
      this.formAddOrgani.reset();
      this._ngbModal.dismissAll();

    }, (errorService) => {
      
      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){
        
        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = "Error al comunicarse con el servidor"; 
        setTimeout(() => this.alertClosed = false, 5000);

      }else if(errorService.status == 401){

        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = errorService.error.message;
        this.mensaje += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 9000);

      }

    });
  }

  addOrga(modal: NgbModal){

    this._ngbModal.open(modal);

  }
   
}
