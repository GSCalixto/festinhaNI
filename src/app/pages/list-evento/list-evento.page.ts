import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.page.html',
  styleUrls: ['./list-evento.page.scss'],
})
export class ListEventoPage implements OnInit {

  protected eventos: any;



  constructor(public eventoService: EventoService, public router: Router) { }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnInit() { this.eventos = this.eventoService.getAll(); }
  atualizar() { this.router.navigate(['/tabs/listEvento']); }
  apagar() { }
}
