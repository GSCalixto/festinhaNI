import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MService {

  constructor(public alertController:AlertController) { }

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
