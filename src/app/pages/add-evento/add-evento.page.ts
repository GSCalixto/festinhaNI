import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Evento } from 'src/app/model/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.page.html',
  styleUrls: ['./add-evento.page.scss'],
})
export class AddEventoPage implements OnInit {

  public evento:Evento;
  
  

  constructor(public alertController: AlertController, public router: Router,public eventoService: EventoService) {}

  ngOnInit() {
    this.evento = new Evento;
  }

  onSubmit(form){

    if (form.valid){
      this.eventoService.save(this.evento)
        // tentar/então com dois resultados verdadeiro ou falso
        .then( 
          res=>{
            this.presentAlert("Aviso","Cadastrado!");
            form.reset;
            this.router.navigate(['/']);
          },
          err=>{
            this.presentAlert("Opa!","Erro ao cadastrado!");
          }
        )
      
    }
}

  async presentAlert(titulo:string,texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
     //subHeader:'',
      message: texto,
      buttons: ['Talkey']
    });

    await alert.present();
  }

}
