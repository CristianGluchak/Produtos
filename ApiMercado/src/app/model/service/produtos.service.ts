import { Injectable } from '@angular/core';
import { Produto } from '../entities/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  public componentesDoProduto : Produto[] = [];

  constructor() {
    let p1 : Produto = new Produto("CADEIRA GAMER CL-CK047 | KING | BLACK/RGB", "R$700,00");
    p1.descricao = "Pensada nos grandes gamers que buscam cada vez maiores desafios."
    p1.fornecedor = "Mundo Gamer";
    
    let p2 : Produto = new Produto("MONITOR GAMER CURVO SAMSUNG ODYSSEY RG90 49", "R$9000,00");
    p2.descricao = "O monitor otimizado para jogos é projetado para permitir que você jogue para vencer."
    p2.fornecedor = "Samsung";

    let p3 : Produto = new Produto("MOUSEPAD GAMER SPEED MPG103 (800x300mm)", "R$45,00");
    p3.descricao = "O Mouse Pad Gamer Fortrek Speed MPG103 apresenta um design moderno e futurista, perfeito para complementar o seu desktop"
    p2.fornecedor = "Fortrek"

    let p4 : Produto = new Produto("MOUSE GAMER VICKERS 8000 Dpi RGB", "80,00");
    p4.descricao = " foi construído e pensado nos mínimos detalhes, possuindo design diferenciado, ergonômico e estiloso"
    p4.fornecedor = "Fortrek"

    let p5 : Produto = new Produto("CAIXA DE SOM 2.0 USB 5V 2X 1W ROSA - VS-01R", "R$24,90");
    p5.descricao = "Alimentação: USB 5V Potência: 2 x 1W (2W) Frequência de resposta: 100 Hz - 180 Hz"
    p5.fornecedor = "VINIK"

    let p6 : Produto = new Produto("KIT 3 COOLERS AEROCOOL MIRAGE 12 PRO ARGB + HUB + CONTROLE", "R$390,99,00");
    p6.descricao = "O Kit 3 Coolers Aerocool Mirage 12 Pro é um modelo que conta com ventilador de 120 mm com conector de 6 pinos com design Infinity Mirror RGB"
    p6.fornecedor = "Mirage"

    let p7 : Produto = new Produto("HEADSET GAMER CL-HJ507 | JUNGLE", "R$250,50");
    p7.descricao = ""
    p7.fornecedor = ""

    let p8 : Produto = new Produto("MESA GAMER VICKERS PRETA ", "R$670,00");
    p8.descricao = "A Mesa Gamer Fortrek Vickers é cuidadosamente projetada para suportar os setups mais avançados do mercado."
    p8.fornecedor = "Fortrek"

    let p9 : Produto = new Produto("GABINETE GAMER AERTOCOOL AERO ONE MINI LATERAL VICRO", "R$1300,00");
    p9.descricao = "garantindo uma iluminação vibrante que complementará o seu setup"
    p9.fornecedor = "Fortrek"

    this.componentesDoProduto.push(p1);
    this.componentesDoProduto.push(p2);
    this.componentesDoProduto.push(p3);
    this.componentesDoProduto.push(p4);
    this.componentesDoProduto.push(p5);
    this.componentesDoProduto.push(p6);
    this.componentesDoProduto.push(p7);
    this.componentesDoProduto.push(p8);
    this.componentesDoProduto.push(p9);

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
