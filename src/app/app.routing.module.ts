import { Routes } from '@angular/router';

import { LoginComponent } from './components/shared/login/login.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

import { EstudiantesUserComponent } from './components/usuarios/estudiantes-user/estudiantes-user.component';
import { AdminUsersComponent } from './components/usuarios/admin-users/admin-users.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { UpdateEstudiantesUserComponent } from './components/usuarios/estudiantes-user/update-estudiantes-user.component';
import { EventoDetalleEstudianteComponent } from './components/usuarios/estudiantes-user/evento-detalle-estudiante.component';
import { InfoEstudianteComponent } from'./components/usuarios/estudiantes-user/info-estudiante.component';
import { ListOrganizacionComponent } from './components/organizaciones/list-organizacion.component';
import { InvitadosComponent } from './components/invitados/invitados.component';
import { DetalleEstudiantesComponent } from './components/usuarios/estudiantes-user/detalle-estudiantes.component';
import { DetalleOrganizacionComponent } from './components/organizaciones/detalle-organizacion.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
//guards
import { ValidUserGuard } from './guards/valid-user.guard';




export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    // canActivate: [ValidUserGuard]
    { path: 'home', component: SidebarComponent,  

        children:[

            { path: '', component: EstudiantesUserComponent },
            { path: 'adminuser',component: AdminUsersComponent },
            { path: 'eventos', component: EventosComponent },
            { path: 'organi', component: ListOrganizacionComponent },
            { path: 'organi/detalle/:codigo', component: DetalleOrganizacionComponent },            
            { path: 'invitados', component: InvitadosComponent },
            { path: 'estudiante/:codigo', component: InfoEstudianteComponent, 
                children: [
                    { path: 'detaestu', component: DetalleEstudiantesComponent },
                    { path: 'eventestu', component: EventoDetalleEstudianteComponent },
                    { path: 'update', component: UpdateEstudiantesUserComponent },
                    { path: '**', pathMatch: 'full', redirectTo: 'detaestu' }
                ] 
            }       

        ]
    },
    
    
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
