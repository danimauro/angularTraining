
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service'
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
              private _userService:UserService, 
              private router:Router) {
    
    this.formLogin = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$'),Validators.minLength(13)]),
      'password': new FormControl('',[Validators.required, Validators.minLength(9)])
    });
  
  }

  onSubmitLogin(){
  
    this._login.getLogin(this.formLogin.value).subscribe( (data : any) => {

      this.usuarioLogueado = data.usuarioDB;
      this.usuarioLogueado.token = data.token;
      this._userService.setUserLoggedIn(this.usuarioLogueado);
      this.router.navigateByUrl('home');

    }, ( errorService ) => {
      this.error = true;
      console.log();
      if(errorService.status == 0 || 500){
        this.mensajeError = "Error en la comunicación con el servidor";
      }
      this.mensajeError = errorService.error.err.message;
      this.formLogin.reset();
    });
    
  }


}
