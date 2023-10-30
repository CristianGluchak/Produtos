import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Produto } from '../entities/Produto';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "produtos";

  constructor( private firestore : AngularFirestore,
    private storage : AngularFireStorage) { }

  buscarTodos(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(produto : Produto){
    return this.firestore.collection(this.PATH)
    .add({nome : produto.nome,preco : produto.preco,descricao : produto.descricao,
    fornecedor :produto.fornecedor , categoria : produto.categoria , downloadURL: produto.downloadURL});
  }

  editar(produto : Produto, id : string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome : produto.nome,preco : produto.preco,descricao : produto.descricao,
    fornecedor :produto.fornecedor , categoria : produto.categoria , downloadURL: produto.downloadURL});
  }
  
  excluir(id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .delete();
  }

  uploadImage(image : any, produto :Produto){
    const file =image.item(0)
    if (file.type.split('/')[0] !== 'image'){
      console.error("Tipo nao Suportado");
      return;
    }
    const path =`images/${produto.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp =>{
          produto.downloadURL =resp;
          if(! produto.id){
            this.cadastrar(produto);
          }else{
            this.editar(produto,produto.id)
          }
        })
      })
    ).subscribe();
    return task;
  }

}
