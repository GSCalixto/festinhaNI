import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Usuario } from '../model/usuario';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public db: AngularFireDatabase) { }
  save(usuario: Usuario) {
    return this.db.list("usuario").push(usuario);
  }
  getAll() {
    return this.db.list<Usuario[]>("usuario").snapshotChanges()/*pega a key */
      .pipe(/*pipe(): essa função manipula dados*/
        map(noCopy => noCopy.map(c => ({ key: c.payload.key, ...c.payload.val() })))/*map(): mapeia as informações*/
      )
  }

  get(key: string) {
    return this.db.object<Usuario>("usuario/" + key).valueChanges()/*pega os valores*/
  }
  remove(key: string) {
    return this.db.object("usuario/" + key).remove()
  }
  update(usuario: Usuario, key: string) {
    return this.db.object("usuario/" + key).update(usuario)
  }
}
