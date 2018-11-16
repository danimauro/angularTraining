import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EstudianteService } from '../../../services/estudiante.service';
import { Usuario } from '../../../models/usuario.model';

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
              private _estudianteService:EstudianteService) { 

    //se validan los parametros enviados por la url
    this.activatedRoute.params.subscribe( params => {
      this.getEstudianteEventos( params['codigo'] );
    });

  }

  // Este metodo trae los datos basicos del estudiante y los programas que tiene relacionados
  getEstudianteEventos(codigo:string){

    this._estudianteService.getEstudianteEventos(codigo).subscribe( (estueventoDB: any) => {

      // Se guardan los datos que trae el servicio en las variables locales
      this.estudiante = estueventoDB;
      this.eventosEstudiante = estueventoDB.eventoUsuario;  

      // mostramos los datos en la vista cuando el servicio termine de cargar la información
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


  onSubmitActualizarEstu(){

    this._estudianteService.putEstudiante(this.formActualizarUsuario.value, this.estudiante.codigo).subscribe( (data: any) => {

      this.correcto = true;
      this.mensajeCorrecto = data.message;

    }, ( errorService ) => {
      
      this.error = true;

      if(errorService.status == 400){

        this.mensajeError = errorService.error.err.message;

      }else if(errorService.status == 0 || errorService.status == 500){

        this.mensajeError = "Error en la comunicación con el servidor"

      }else if(errorService.status == 401){

        this.mensajeError = this.mensajeError = errorService.error.err.message;

      }

    });

  }

  desactivarEstu(codigoEvento:string, codigoEstudiante:string){
    console.log(codigoEvento);
    console.log(codigoEstudiante);
  }


}
