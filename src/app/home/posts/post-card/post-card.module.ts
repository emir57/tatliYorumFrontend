import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PostCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PostCardComponent
  ]
})
export class PostCardModule { }
