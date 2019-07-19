import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from "@angular/fire/auth";

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';



@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})

export class AddUsuarioPage implements OnInit {

  public usuario: Usuario;
  public key: string;
  protected preview: any;



  constructor(public alertController: AlertController, public router: Router, public usuarioService: UsuarioService,
    public activeRoute: ActivatedRoute, private camera: Camera, private afAuth: AngularFireAuth, private loadingCTRL: LoadingController) { }




  ngOnInit() {
    this.usuario = new Usuario;
    this.preview = null;
    this.key = this.activeRoute.snapshot.paramMap.get("key");
    if (this.key) {
      this.usuarioService.get(this.key).subscribe(res => this.usuario = res, err => this.key = null);
    }
  }


  showLoading() {
    this.loadingCTRL.create({
      message: "Cadastrando...",
      spinner: "lines-small"
    }).then((loading) => { loading.present(); })
  }

  closeLoading() {
    this.loadingCTRL.dismiss();
  }


  onSubmit(form) {
    //if(this.preview = null){
    if (form.valid) {
      this.usuario.foto = this.preview;
      if (!this.key) {
        this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.pws)
          //salvando dados
          // tentar/então com dois resultados verdadeiro ou falso
          .then(
            res => {

              this.closeLoading();
              this.usuario.email = null;
              this.usuario.pws = null;
              this.usuarioService.save(this.usuario, res.user.uid);
              this.presentAlert("Aviso", "Cadastrado!");
              form.reset;
              this.router.navigate(['/']);
            },
            err => {
              this.closeLoading()
              this.presentAlert("Opa!", "Erro ao cadastrado!");
            }
          ).catch(
            err => {
              this.presentAlert("Opa!", "Ao acessar o banco!");
              this.router.navigate(['/'])
            }
          )
      } else {
        //atualizando os dados se a "key" existir
        this.usuarioService.update(this.usuario, this.key)
          .then(
            res => {
              this.presentAlert("Aviso", "Atualizado!");
              form.reset();
              this.router.navigate(['/']);
            },
            err => {
              this.presentAlert("Opa!", "Erro ao cadastrado!");
            },
          )
      }
    }
    //}
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
  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
  }
}
