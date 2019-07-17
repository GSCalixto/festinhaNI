import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { MService } from 'src/app/services/m.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {

  protected email: string;
  protected pws: string;

  constructor(public afAuth: AngularFireAuth, public msg: MService, public router: Router) { }

  ngOnInit() {
  }
  onSubmit(form) {
    if (form.valid) {
      this.login();
    } else {
      this.msg.presentAlert("Erro!", "Campos obrigatórios");
    }
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        this.router.navigate(['/']);
        console.log(res.user.uid);
      },
      err => {
        this.pws = null;
        this.msg.presentAlert("Erro!", "Usuario não localizado")
      }
    );
  }
  loginWeb() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
