import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected usuarios: any;
  protected nuser: number = 0;

  constructor(public usuarioService: UsuarioService) {
    this.usuarioService.getAll().subscribe(
      res =>
      this.nuser = res.length,err => this.nuser = 0
    )
  }

  
}