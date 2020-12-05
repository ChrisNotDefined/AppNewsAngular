import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTemplateComponent } from './new-template/new-template.component';

// Los componentes que se usen en este archivo de rutas solo deben ser aquellos
// que se han importado o bien que fueron definidos en este módulo
// tales como: newTempleteComponent y TemplateComponent
const routes: Routes = [
  {path: ':newsId', component: NewTemplateComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  // Unicamente rutas hijas  (!= app-routing.module)
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
