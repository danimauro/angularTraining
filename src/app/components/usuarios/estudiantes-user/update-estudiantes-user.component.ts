import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { EstudianteService } from '../../../services/estudiante.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-update-estudiantes-user',
  templateUrl: './update-estudiantes-user.component.html',
  styleUrls: ['./update-estudiantes-user.component.css']
})
export class UpdateEstudiantesUserComponent{

  public formActualizarUsuario: FormGroup;
  public error:boolean = false;
  public mensajeError:string;
  public estudiante: Usuario;
  public eventosEstudiante: any [];
  public cargo: boolean;
  public correcto: boolean = false;
  public mensajeCorrecto:string;

  //datatable
  public rowsOnPage = 5;
  public filterQuery = "";
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private activatedRoute: ActivatedRoute, 
              private _estudianteService:EstudianteService,
              private alerts:AlertsService) { 

    this.activatedRoute.params.subscribe( params => {
      this.getEstudianteEventos( params['id'] );
    });

  }

  getEstudianteEventos(id:string){
    this._estudianteService.getEstudianteEventos(id).subscribe( (data: any) => {

      //guardamos en las variables del componente los datos que trae el servicio
      this.estudiante =  data.eventosEstudianteDB[0];
      this.eventosEstudiante = data.eventosEstudianteDB[0].eventoUsuario;  
      
      // mostramos los dato en la vista cuando el servicio tenga datos de respuesta

      this.cargo = true;

      //se carga el formulario
      this.formActualizarUsuario = new FormGroup({
        'codigo': new FormControl(''),
        'identidad': new FormControl({value: '', disabled:true}, [Validators.required]),
        'nombre': new FormControl('',[Validators.required]),
        'apellido': new FormControl('',[Validators.required]),
        'telfijo': new FormControl('',[Validators.required]),
        'telcel': new FormControl('',[Validators.required]),
        'email': new FormControl('',[Validators.required, Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$'),Validators.minLength(13)]),
        'edad': new FormControl('',[Validators.required]),
        'sexo': new FormControl('' ,[Validators.required]),
        'fecregistro': new FormControl({value: '', disabled:true}),
        'eventoUsuario': new FormControl('')
      });

      // se llena el formulario con los datos del modelo usuario-estudiante
      this.formActualizarUsuario.setValue(this.estudiante);  

    }, (errorService) => {
      //manejo de errores
      this.error = true;

      if(errorService.status == 0 || 500){
        this.mensajeError = "Error en la comunicación con el servidor";
      }else{
        this.mensajeError = errorService.error.err.message;
      }

    });
  }


  onSubmitActualizarEstu(){

    this._estudianteService.putEstudiante(this.formActualizarUsuario.value, this.estudiante.codigo).subscribe( (data: any) => {

      this.correcto = true;
      this.mensajeCorrecto = data.message;

    }, ( errorService ) => {
      
      this.error = true;

      if(errorService.status == 0 || 500){
        this.mensajeError = "Error en la comunicación con el servidor";
      }else{
        this.mensajeError = errorService.error.err.message;
      }

    });

  }

  desactivarEstu(codigoEvento:string, codigoEstudiante:string){
    console.log(codigoEvento);
    console.log(codigoEstudiante);
  }


}
