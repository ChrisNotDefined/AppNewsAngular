import { NewTemplateComponent } from './new/new-template/new-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "home",  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  {path: "new", component: NewTemplateComponent},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
