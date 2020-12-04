import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';
import { OthersComponent } from './others/others.component';


@NgModule({
  declarations: [HomeComponent, AsideMenuComponent, FeaturedComponent, OthersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
