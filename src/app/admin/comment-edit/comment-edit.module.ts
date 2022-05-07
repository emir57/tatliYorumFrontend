import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentEditPageRoutingModule } from './comment-edit-routing.module';

import { CommentEditPage } from './comment-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CommentEditPage]
})
export class CommentEditPageModule { }
