import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-update-estudiantes-user',
  templateUrl: './update-estudiantes-user.component.html'
})
export class UpdateEstudiantesUserComponent{

  public formActualizarEstudiante: FormGroup;
  public error:boolean = false;
  public mensajeError:string;
  public estudiante: Estudiante;
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
    this.activatedRoute.parent.params.subscribe( params => {
      this.getEstudiante( params['codigo'] );
    });

  }

  // Este metodo trae un estudiante por medio del codigo
  getEstudiante(codigo:string){

    this._estudianteService.getEstudiante(codigo).subscribe( (estudianteDB: Estudiante) => {

      // Se guardan los datos que trae el servicio en las variables locales
      this.estudiante = estudianteDB; 

      // mostramos los datos en la vista cuando el servicio termine de cargar la información
      this.cargo = true;

      //se carga el formulario
      this.formActualizarEstudiante = new FormGroup({
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
        'estado': new FormControl('')
      });

      // se llena el formulario con los datos del modelo usuario-estudiante
      this.formActualizarEstudiante.setValue(this.estudiante);  

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
