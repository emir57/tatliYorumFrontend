import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostAddPageRoutingModule } from './post-add-routing.module';

import { PostAddPage } from './post-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAddPageRoutingModule
  ],
  declarations: [PostAddPage]
})
export class PostAddPageModule {}
