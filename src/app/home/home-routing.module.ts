import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'posts',
    component: HomePage,
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
  },
  {
    path: 'post-add',
    component: HomePage,
    loadChildren: () => import('./post-add/post-add.module').then(m => m.PostAddPageModule)
  },
  {
    path: 'settings',
    component: HomePage,
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
