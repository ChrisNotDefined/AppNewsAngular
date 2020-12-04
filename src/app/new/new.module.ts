import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { NewTemplateComponent } from './new-template/new-template.component';



@NgModule({
  declarations: [TemplateComponent, NewTemplateComponent],
  imports: [
    CommonModule
  ]
})
export class NewModule { }
