import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UsersComponent } from './modules/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './modules/user-form/user-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomMatErrorComponent } from './common/ui/custom-mat-error/custom-mat-error.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomersComponent } from './modules/customers/customers.component';
import { CustomerFormComponent } from './modules/customer-form/customer-form.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    UsersComponent,
    UserFormComponent,
    CustomMatErrorComponent,
    CustomersComponent,
    CustomerFormComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSnackBarModule
  ]
})
export class ComponentsModule { }
