import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProdutosService } from '../../model/service/produtos.service';
import { Produto } from '../../model/entities/Produto';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome! : string;
  public preco! : string;
  public descricao! : string;
  public categoria! : number;
  public fornecedor !: string;

  constructor(private alertController: AlertController,
    private router : Router, private produtoService : ProdutosService) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.preco ){
      let novo : Produto = new Produto(this.nome, this.preco);
      novo.descricao = this.descricao;
      novo.categoria = this.categoria;
      novo.fornecedor = this.fornecedor;
      this.produtoService.cadastrar(novo);
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro", "Nome e Preço são campos Obrigatórios!");
    }
  }


  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Mercado Online',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
