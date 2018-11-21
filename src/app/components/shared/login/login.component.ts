import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  formLogin: FormGroup;
  mensajeError: string;

  //alert
  alertClosed: boolean = false;
  type:string;

  constructor(private _login: LoginService,
              private router:Router) {
    
    this.formLogin = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$'),Validators.minLength(13)]),
      'password': new FormControl('',[Validators.required, Validators.minLength(9)])
    });
  
  }

  onSubmitLogin(){
  
    this._login.getLogin(this.formLogin.value).subscribe( () => {

      //cuando el login es correcto redirecciona al home de la aplcación
      this.router.navigateByUrl('home');

    }, ( errorService ) => {

      // Si se presenta un error en la petición se activa el mensaje en la vista
      this.alertClosed = true;
      this.type = "danger";
      setTimeout(() => this.alertClosed = false, 4000);

      // Se manejan los errores por medio del codigo de respuesta de la petición
      if(errorService.status == 0 || errorService.status == 500){

        this.alertClosed = true;
        this.type = "danger";
        setTimeout(() => this.alertClosed = false, 4000);
        this.mensajeError = "Error en la comunicación con el servidor";
        this.formLogin.reset();

      }else if(errorService.status == 403){

        this.alertClosed = true;
        this.type = "danger";
        setTimeout(() => this.alertClosed = false, 4000);
        this.mensajeError = "Usuario en estado: Inactivo, comunicarse con el administrador";
        this.formLogin.reset();

      }else{

        this.mensajeError = errorService.error.message;
        this.formLogin.reset();
        
      }
            
    });
    
  }


}
