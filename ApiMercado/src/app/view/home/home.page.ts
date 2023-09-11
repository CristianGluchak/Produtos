import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProdutosService } from '../../model/service/produtos.service';
import { Produto } from '../../model/entities/Produto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public componentesDoProduto : Produto[] = [];

  constructor(private alertController: AlertController,
    private router : Router, private produtosService : ProdutosService) {
      this.componentesDoProduto = this.produtosService.obterTodos();
    }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(indice :  number){
    this.router.navigate(["/editar", indice]);
  }
}
