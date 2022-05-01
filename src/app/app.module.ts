import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ColorPickerModule } from 'ngx-color-picker';
import { CommentsPipe } from './comments.pipe';

@NgModule({
  declarations: [AppComponent, CommentsPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ColorPickerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: "baseUrl", useValue: "http://localhost:8082/tatliYorum" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
