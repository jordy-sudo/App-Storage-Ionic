import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'principal',
        loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
      }

    ],

  },
  {
    path: 'mapa/:lat/:long',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  }
  /*
    {
      path: 'principal',
      loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
    },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
