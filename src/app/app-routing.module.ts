import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { dashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: dashboardComponent},
  {path: 'dashboard', component: dashboardComponent ,canActivate: [AuthGuard],},
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
