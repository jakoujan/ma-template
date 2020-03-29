import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { UsersComponent } from './modules/users/users.component';
import { CustomersComponent } from './modules/customers/customers.component';


const routes: Routes = [
  {
    path: '', component: NavigationComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'customers', component: CustomersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
