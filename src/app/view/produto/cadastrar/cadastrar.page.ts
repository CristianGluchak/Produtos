import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from '../../../model/entities/Produto';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoBackPage } from 'src/app/common/goBackPage';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  registerForm!:FormGroup;
  user : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService,
    private auth : AuthService,private builder : FormBuilder,
    private goBack: GoBackPage
    ) {
      this.user = this.auth.getUsuarioLogado();
      this.registerForm = new FormGroup({
        nome : new FormControl(''),
        preco : new FormControl(''),
        descricao : new FormControl(''),
        categoria : new FormControl(''),
        fornecedor : new FormControl(''),
        imagem :new FormControl('')
      })
     }

  ngOnInit() {
    this.registerForm = this.builder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      preco: ['', [Validators.required, Validators.minLength(2)]],
      descricao: ['', [Validators.required,]],
      categoria: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]],
      imagem: ['', [Validators.required]]
    })
  }

  uploadFile(event: any) {
    const imagem = event.target.files;

    if (imagem && imagem.length > 0) {
      this.registerForm.patchValue({ imagem: imagem });
    }
  }

  cadastrar(){
    if(this.registerForm.valid){
      const novo : Produto = new Produto
      (this.registerForm.value.nome,
       this.registerForm.value.preco);
      novo.descricao = this.registerForm.value.descricao;
      novo.categoria = this.registerForm.value.categoria;
      novo.fornecedor = this.registerForm.value.fornecedor;
      novo.uid = this.user.uid;
      if(this.registerForm.value.imagem){
        this.firebase.uploadImage(this.registerForm.value.imagem, novo)
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

}
