import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public side: boolean = true;
  public nombre: String;

  constructor(private _userService:UserService, 
              private router:Router) { }

  ngOnInit() {
    
    if(!this._userService.getUserLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    
    this.nombre = this._userService.getNombre();
    

  }
  //mostrar y ocultar el menu lateral
  sidebar(){
    if(this.side){
      this.side = false;
    }else{
      this.side = true;
    }
  }

  //Cerrar sesion
  cerrarSesion(){
    this._userService.cerrarSession();
    this.router.navigateByUrl('/login');
  }

}
