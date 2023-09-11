import { Injectable } from '@angular/core';
import { Produto } from '../entities/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  public componentesDoProduto : Produto[] = [];

  constructor() {
    let c1 : Produto = new Produto("produto 1", "valor teste");
    let c2 : Produto = new Produto("produto 2", "valor teste");
    let c3 : Produto = new Produto("produto 3", "valor teste");
    let c4 : Produto = new Produto("produto 4", "valor teste");
    this.componentesDoProduto.push(c1);
    this.componentesDoProduto.push(c2);
    this.componentesDoProduto.push(c3);
    this.componentesDoProduto.push(c4);
   }

   cadastrar(contato : Produto){
    this.componentesDoProduto.push(contato);
   }

   obterTodos(): Produto[]{
    return this.componentesDoProduto;
   }

   obterPorIndice(indice : number) : Produto{
    return this.componentesDoProduto[indice];
   }

   atualizar(indice: number,novo : Produto){
    this.componentesDoProduto[indice]=novo;
   }
   deletar(indice : number ){
    this.componentesDoProduto.splice(indice,1);
   }}
