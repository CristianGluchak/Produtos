import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from '../../../model/entities/Produto';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public componentesDoProduto : Produto[] = [];

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService,
    private auth : AuthService) {
      console.log(this.auth.getUsuarioLogado())
      this.firebase.buscarTodos()
      .subscribe(res => {
        this.componentesDoProduto = res.map(produto => {
          return{
            id: produto.payload.doc.id,
            ...produto.payload.doc.data() as any
          }as Produto
        })
      })
    }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  

  editar(produto : Produto){
    this.router.navigateByUrl("/editar",{state : { produto : produto}});
  }
}
