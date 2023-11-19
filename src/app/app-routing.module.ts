import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/produto/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logar',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./view/produto/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/produto/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./view/usuario/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'logar',
    loadChildren: () => import('./view/usuario/logar/logar.module').then( m => m.LogarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
