import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from 'src/app/model/entities/Produto';
import { FirebaseService } from 'src/app/model/service/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  indice! : number;
  nome! : string;
  preco! : string;
  descricao! : string;
  categoria! : number;
  fornecedor !: string;
  produto! : Produto;
  edicao : boolean =true;
  imagem! : any;


  constructor(
    private firebase : FirebaseService,
    private router : Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.produto = history.state.produto;
    this.nome = this.produto.nome;
    this.preco = this.produto.preco;
    this.descricao = this.produto.descricao;
    this.categoria = this.produto.categoria;
    this.fornecedor = this.produto.fornecedor;

  }
  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  editar(){
    if(this.nome && this.preco  ){
      let novo : Produto = new Produto(this.nome, this.preco);
      novo.descricao = this.descricao;
      novo.categoria = this.categoria;
      novo.fornecedor= this.fornecedor;
      novo.id = this.produto.id;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
        ?.then(()=>{this.router.navigate(["/home"])})
      }else{
        novo.downloadURL = this.produto.downloadURL;
        this.firebase.editar(novo, this.produto.id)
        .then(()=>{this.router.navigate(["/home"]);})
        .catch((error)=>{
          console.log(error);
          this.presentAlert("Erro", "Erro ao Atualizar Produto!");
        })
      }
    }else{
      this.presentAlert("Erro", "Nome e Preço são campos Obrigatórios!");
    }
  }
  
  excluir(){
    this.presentConfirmAlert("ATENÇÃO","Deseja realmente excluir o Produto?");

  }
  excluirProduto(){
    this.firebase.excluir(this.produto.id)
    .then(() => { this.router.navigate(["/home"]);})
    .catch((error)=>{
      console.log(error);
      this.presentAlert("Erro", "Erro ao Excluir Produto!");
    })
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
  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Mercado Online',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar',role:'cancelar', handler: ()=>{console.log("cancelou")}},
        {text: 'Confirmar',role:'confirmar', handler: (acao)=>{this.excluirProduto()}}
      ],
    });
    await alert.present();
  }

}
