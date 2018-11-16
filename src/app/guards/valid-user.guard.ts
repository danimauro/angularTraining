import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class ValidUserGuard implements CanActivate {

    constructor(private _authService: UserService, 
                private router: Router) { }

    canActivate() {
        // Si el usuario no está conectado, lo enviaremos de vuelta a la página de inicio
        if (!this._authService.isLogged()) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}