import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
//constructor(public alertController: AlertController) {}
export class AddUsuarioPage implements OnInit {
  
  public usuario:Usuario;

  constructor(public alertController: AlertController, public router: Router) {}

  ngOnInit() {
    this.usuario = new Usuario;
  }

  onSubmit(form){
    if (form.valid){
      //console.log("Cadastrado",this.usuario);
      this.presentAlert("Aviso","Cadastrado!")
      form.reset;
      this.router.navigate(['/'])
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
