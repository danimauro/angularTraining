
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  formLogin: FormGroup;
  error: boolean = false;
  mensajeError: string;
  usuarioLogueado: Usuario;

  constructor(private _login: LoginService,
              private router:Router) {
    
    this.formLogin = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$'),Validators.minLength(13)]),
      'password': new FormControl('',[Validators.required, Validators.minLength(9)])
    });
  
  }

  onSubmitLogin(){
  
    this._login.getLogin(this.formLogin.value).subscribe( (usuarioDB : Usuario) => {
      
      this.router.navigateByUrl('home');

    }, ( errorService ) => {

      // Si se presenta un error en la petición se activa el mensaje en la vista
      this.error = true;

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){
        this.mensajeError = "Error en la comunicación con el servidor";
      }else if(errorService.status == 403){
        this.mensajeError = "Usuario en estado: Inactivo, comunicarse con el administrador";
        this.formLogin.reset();
      }else{
        this.mensajeError = errorService.error.err.message;
        this.formLogin.reset();
      }
            
    });
    
  }


}
