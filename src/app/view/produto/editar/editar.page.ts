import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Produto } from 'src/app/model/entities/Produto';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  detailsForm!: FormGroup;
  produto! : Produto;
  imagem! : any;
  user :any;


  constructor(
    private firebase : FirebaseService,
    private router : Router,
    private alertController: AlertController,
    private auth : AuthService,
    private goBack: GoBackPage,
    private formBuilder: FormBuilder) {
      this.user = this.auth.getUsuarioLogado();
     }

  ngOnInit() {
    this.produto = history.state.produto;
    this.detailsForm = this.formBuilder.group({
      nome: [this.produto.nome, [Validators.required, Validators.minLength(5)]],
      preco: [this.produto.preco, [Validators.required, Validators.minLength(2)]],
      descricao: [this.produto.descricao, [Validators.required,]],
      categoria: [this.produto.categoria, [Validators.required]],
      fornecedor: [this.produto.fornecedor, [Validators.required]],
      imagem: [null],
      
    })
  }

  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  editar(){
    if (this.detailsForm.valid){
      const novo: Produto = {...this.detailsForm.value,uid: this.user.uid,
        id: this.produto.id, downloadURL: this.produto.downloadURL};

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
      this.presentAlert("Erro", "Verifique os campos obrigatórios!");
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
  goBackPage(){
    this.goBack.goBackPage();
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
