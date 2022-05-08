import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostlikesPageRoutingModule } from './postlikes-routing.module';

import { PostlikesPage } from './postlikes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostlikesPageRoutingModule
  ],
  declarations: [PostlikesPage]
})
export class PostlikesPageModule {}
