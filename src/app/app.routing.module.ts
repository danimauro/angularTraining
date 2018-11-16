import { Routes } from '@angular/router';

import { LoginComponent } from './components/shared/login/login.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

import { EstudiantesUserComponent } from './components/usuarios/estudiantes-user/estudiantes-user.component';
import { AdminUsersComponent } from './components/usuarios/admin-users/admin-users.component';

//guards
import { ValidUserGuard } from './guards/valid-user.guard';
import { EventosComponent } from './components/eventos/eventos.component';
import { UpdateEstudiantesUserComponent } from './components/usuarios/estudiantes-user/update-estudiantes-user.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: SidebarComponent, canActivate: [ValidUserGuard], 

        children:[

            {
                path: '',
                component: EstudiantesUserComponent
            },
            {
                path: 'adminuser',
                component: AdminUsersComponent
            },
            {   path: 'eventos', 
                component: EventosComponent 
            },
            {   path: 'estudiupdate/:id', 
                component: UpdateEstudiantesUserComponent 
            },           

        ]
    },
    
    
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
