import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { NewTemplateComponent } from './new-template/new-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';



@NgModule({
  declarations: [TemplateComponent, NewTemplateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewRoutingModule,
  ]
})
export class NewModule { }
