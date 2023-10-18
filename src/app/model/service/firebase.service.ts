import { Injectable } from '@angular/core';
import { Produto } from '../entities/Produto';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "produtos";

  constructor( private firestore : AngularFirestore) { }

  buscarTodos(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(produto : Produto){
    return this.firestore.collection(this.PATH)
    .add({nome : produto.nome,preco : produto.preco,descricao : produto.descricao,
    fornecedor :produto.fornecedor , categoria : produto.categoria});
  }

  editar(produto : Produto, id : string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome : produto.nome,preco : produto.preco,descricao : produto.descricao,
    fornecedor :produto.fornecedor , categoria : produto.categoria});
  }
  
  excluir(id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .delete();
  }
}
