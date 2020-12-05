import { NewTemplateComponent } from './new/new-template/new-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home',  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  // Cargamos el módulo de news en lugar de cargar el compoenten NewTemplateComponent
  // Dentro de este módulo cargaremos los compoentens que pertenecen a este módulo,
  // por eso siempre creamos un módulo con su propio archivo de rutas
  // Comando para crear módulo y archivo de rutas: (ng generate module nombreModulo --routing)
  {path: 'news', loadChildren: () => import('./new/new.module').then((m) => m.NewModule)},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  // forRoot unicamente es llamda por el archivo principal de rutas
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
