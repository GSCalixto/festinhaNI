import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected usuarios: any;
  protected nuser: number = 0;
  protected eventos: any;
  protected nevent: number = 0;

  constructor(public usuarioService: UsuarioService,public eventoService:EventoService) {
    this.usuarioService.getAll().subscribe(
      res =>
      this.nuser = res.length,err => this.nuser = 0
    ),
    this.eventoService.getAll().subscribe(
      res =>
      this.nevent = res.length,err => this.nevent = 0
    )
  }

  
}