import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;
  
  

  constructor(public usuarioService: UsuarioService, public router: Router, public alertController: AlertController) { }
 
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
  apagar(key){
    this.usuarioService.remove(key).then(
      res => {this.presentAlert("Aviso!", "Usuario apagado")}, 
      err =>{this.presentAlert("Erro!", "Não foi possivel apagar o usuario!")}
    ) 
  }
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader:'',
      message: texto,
      buttons: ['Talkey']
    });

    await alert.present();
  }
}
