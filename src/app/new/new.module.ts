import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTemplateComponent } from './new-template/new-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';



@NgModule({
  declarations: [NewTemplateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewRoutingModule,
  ]
})
export class NewModule { }
