import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;
  
  

  constructor(public usuarioService: UsuarioService, public router: Router) { }
 
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.usuarios = this.usuarioService.getAll();
  }
  atualizar(){
    this.router.navigate(['/tabs/listUsuario']);}
  apagar(){
    
  }
}
