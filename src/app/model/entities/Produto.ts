export class Produto {
  private _id!: string;
  private _nome!: string;
  private _preco!: string;
  private _descricao!: string;
  private _fornecedor!: string;
  private _categoria!: number;
  private _downloadURL: any;


  constructor(nome: string, preco: string) {
    this._nome = nome;
    this._preco = preco;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }


  public get nome(): string {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get preco(): string {
    return this._preco;
  }

  public set preco(preco: string) {
    this._preco = preco;
  }

  public get descricao(): string {
    return this._descricao;
  }
  public set descricao(value: string) {
    this._descricao = value;
  }


  public get fornecedor(): string {
    return this._fornecedor;
  }
  public set fornecedor(value: string) {
    this._fornecedor = value;
  }


  public get categoria(): number {
    return this._categoria;
  }
  public set categoria(value: number) {
    this._categoria = value;
  }
  public get downloadURL(): any {
    return this._downloadURL;
  }
  public set downloadURL(value: any) {
    this._downloadURL = value;
  }


}
