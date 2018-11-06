import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//aproxi por data en form importamos estos paquetes 
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

//componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { EstudiantesUserComponent  } from './components/usuarios/estudiantes-user/estudiantes-user.component';
import { UpdateEstudiantesUserComponent } from './components/usuarios/estudiantes-user/update-estudiantes-user.component';
import { AdminUsersComponent  } from './components/usuarios/admin-users/admin-users.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EventosComponent } from './components/eventos/eventos.component';

// Routas
import { ROUTES } from './app.routing.module';

//http
import { HttpClientModule } from '@angular/common/http';

//services
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { EstudianteService } from './services/estudiante.service';

//guards
import { ValidUserGuard } from './guards/valid-user.guard';

import { DataFilterPipe } from './pipes/data-filter.pipe';

//datatable 
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    EstudiantesUserComponent,
    UpdateEstudiantesUserComponent,
    AdminUsersComponent,
    EventosComponent,
    LoginComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [ 
    LoginService,
    UserService,
    EstudianteService,
    ValidUserGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
