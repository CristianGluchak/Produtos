import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Alert } from 'src/app/common/alert';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  cadastro!: FormGroup;

  constructor(private router: Router,
    private alert: Alert,
    private auth: AuthService,
    private builder: FormBuilder
    ) {
    this.cadastro = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    })
  }

  ngOnInit() {
    this.cadastro = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this.cadastro.controls;
  }

  submitForm() {
    if (!this.cadastro.valid) {
      this.alert.presentAlert("OK", "erro ao validar");

    } else {
      this.registrar();
      this.alert.presentAlert("OK", "Seja Bem Vindo!");

    }
  }
  private registrar() {
    this.auth.registrar(this.cadastro.value['email'],
      this.cadastro.value['senha'])
      .then((res) => {
        this.alert.presentAlert("OK", "Seja Bem Vindo!");
        this.router.navigate(['/logar']);
      })
      .catch((error) => {
        this.alert.presentAlert("Erro", "Erro ao cadastrar!");
        console.log(error);
      })
  }

}
