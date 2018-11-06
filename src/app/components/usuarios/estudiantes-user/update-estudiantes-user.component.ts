import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-update-estudiantes-user',
  templateUrl: './update-estudiantes-user.component.html',
  styleUrls: ['./update-estudiantes-user.component.css']
})
export class UpdateEstudiantesUserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe( params => {
      this.getEstudiante( params['id'] );
    });
  }

  ngOnInit() {
  }

  getEstudiante(id: any){
    console.log(id);
  }

}
