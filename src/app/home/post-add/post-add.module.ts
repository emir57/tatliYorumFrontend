import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostAddPageRoutingModule } from './post-add-routing.module';

import { PostAddPage } from './post-add.page';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAddPageRoutingModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  declarations: [PostAddPage]
})
export class PostAddPageModule { }
