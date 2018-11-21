import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//aproxi por data en form importamos estos paquetes 
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

//componentes shared
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LoginComponent } from './components/shared/login/login.component';

//component aplication
import { DetalleEstudiantesComponent } from './components/usuarios/estudiantes-user/detalle-estudiantes.component';
import { EventoDetalleEstudianteComponent } from './components/usuarios/estudiantes-user/evento-detalle-estudiante.component';
import { InfoEstudianteComponent } from'./components/usuarios/estudiantes-user/info-estudiante.component';
import { EstudiantesUserComponent  } from './components/usuarios/estudiantes-user/estudiantes-user.component';
import { UpdateEstudiantesUserComponent } from './components/usuarios/estudiantes-user/update-estudiantes-user.component';

import { AdminUsersComponent  } from './components/usuarios/admin-users/admin-users.component';
import { InvitadosComponent } from './components/invitados/invitados.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
import { ListOrganizacionComponent } from './components/organizaciones/list-organizacion.component';
import { DetalleOrganizacionComponent } from './components/organizaciones/detalle-organizacion.component';
import { EventosComponent } from './components/eventos/eventos.component';

// Routas
import { ROUTES } from './app.routing.module';

//http
import { HttpClientModule } from '@angular/common/http';

//services
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { EstudianteService } from './services/estudiante.service';
import { UserAdminService } from './services/user-admin.service';
import { InvitadoService } from './services/invitado.service';
import { OrganizacionService } from './services/organizacion.service';
import { EventoService } from './services/evento.service';

//guards
import { ValidUserGuard } from './guards/valid-user.guard';

//pipes
import { DataFilterPipe } from './pipes/data-filter.pipe';

//datatable 
import { DataTableModule } from 'angular-6-datatable';

// Bootstrap para angular
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    EstudiantesUserComponent,
    UpdateEstudiantesUserComponent,
    DetalleEstudiantesComponent,
    EventoDetalleEstudianteComponent,
    InfoEstudianteComponent,
    AdminUsersComponent,
    EventosComponent,
    LoginComponent,
    InvitadosComponent,
    OrganizacionesComponent,
    ListOrganizacionComponent,
    DetalleOrganizacionComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [ 
    LoginService,
    UserService,
    EstudianteService,
    UserAdminService,
    InvitadoService,
    EventoService,
    OrganizacionService,
    ValidUserGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
