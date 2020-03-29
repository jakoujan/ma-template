import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'modules',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
