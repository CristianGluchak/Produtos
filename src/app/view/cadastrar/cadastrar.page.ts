import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from '../../model/entities/Produto';
import { FirebaseService } from 'src/app/model/service/firebase.service';

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
  public imagem : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService) { }

  ngOnInit() {
  }
  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }
  cadastrar(){
    if(this.nome && this.preco ){
      let novo : Produto = new Produto(this.nome, this.preco);
      novo.descricao = this.descricao;
      novo.categoria = this.categoria;
      novo.fornecedor = this.fornecedor;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
        ?.then(()=> {
          this.router.navigate(["/home"]);
        })
      }else{
      this.firebase.cadastrar(novo)
      .then(() => this.router.navigate(["/home"]))
      .catch((error) => {
        console.log(error);
        this.presentAlert("Erro", "Erro ao salvar contato!");
        })
      }
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
