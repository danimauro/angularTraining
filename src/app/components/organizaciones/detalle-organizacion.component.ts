import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizacionService } from '../../services/organizacion.service';
import { Organizacion } from '../../models/organizacion.model';

@Component({
  selector: 'app-detalle-organizacion',
  templateUrl: './detalle-organizacion.component.html',
  styleUrls: ['./detalle-organizacion.component.css']
})

export class DetalleOrganizacionComponent implements OnInit {

  public formUpdateOrgani: FormGroup;
  public organizacion:Organizacion;
  selectedFile:File = null;
  cargo:boolean = false;

  //alert
  public alertClosed: boolean = false;
  public type:string;
  public mensaje:string;

  constructor(public _activatedRoute:ActivatedRoute,
              public router:Router,
              public _organizacionService: OrganizacionService) {

    this._activatedRoute.params.subscribe( params => {

      if(params['codigo']){
        this.getOrganizacion(params['codigo']);
      }else{
        this.router.navigateByUrl('organi');
      }      
      
    });
  
  }

  ngOnInit() { 

    this.formUpdateOrgani = new FormGroup({
      'codigo': new FormControl(''),
      'descrip': new FormControl('',[ Validators.required ]),
      'estado': new FormControl(''),      
      'imagen': new FormControl(''),
      'nombre': new FormControl('',[ Validators.required ])
    });

  }

  getOrganizacion(codigo:string){

    this._organizacionService.getOrganizacion(codigo).subscribe( (organizacionDB:Organizacion) => {
      this.organizacion = organizacionDB;
      this.formUpdateOrgani.setValue(this.organizacion);
      this.cargo = true;
    });

  }

  // Cargar imagen
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    this.formUpdateOrgani.value.imagen = this.selectedFile;
    let btnActualizar = document.getElementById('btnActualizar');
    btnActualizar.removeAttribute('disabled');
  }

  updateOrganizacion(){

    this.formUpdateOrgani.value.codigo = this.organizacion.codigo;

    this._organizacionService.putOrganizacion(this.formUpdateOrgani.value).subscribe( (res:any) => {

      //muestra mensaje
      this.alertClosed = true;
      this.type = "success";
      this.mensaje = res.message;
      setTimeout(() => this.alertClosed = false, 5000);
      //actualiza la vista
      this.getOrganizacion(this.organizacion.codigo);

    }, (errorService) => {
      
      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){
        
        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = errorService.error.message; 

      }else if(errorService.status == 401){

        this.alertClosed = true;
        this.type = "danger";
        this.mensaje = errorService.error.message;
        this.mensaje += `, Debe autenticarse nuevamente..`;
        setTimeout(() => this.router.navigateByUrl('login'), 9000);

      }

    });

  }

}
