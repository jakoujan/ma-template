import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CustomersDataSource } from './customers-datasource';
import { ICustomer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomerFilter } from "src/app/filters/customer-filter";
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from '../../common/ui/confirmation-dialog/confirmation-dialog.service';
import { BaseComponent } from '../base-component/base-component.component';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ICustomer>;
  dataSource: CustomersDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['business_name', 'actions', 'tax_id', 'contact', 'telephone', 'email'];
  filter: ICustomerFilter = {
    entity: {
      id: undefined,
      business_name: undefined,
      city: undefined,
      contact: undefined,
      country: undefined,
      external_number: undefined,
      county: undefined,
      internal_number: undefined,
      postal_code: undefined,
      region: undefined,
      settlement: undefined,
      state: undefined,
      street: undefined,
      tax_id: undefined,
      telephone: undefined,
      email: undefined,
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20
  }
  constructor(
    private customerService: CustomerService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private confirmationDialogService: ConfirmationDialogService,
    protected navigationService: NavigationService) {
    super(navigationService);
  }
  ngOnDestroy(): void {
    super.destroy();
  }

  ngOnInit() {
    this.setFilter();

  }

  ngAfterViewInit() {
  }

  public setFilter() {
    this.customerService.filter(this.filter).then(response => {
      this.dataSource = new CustomersDataSource();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = response.fields.data.data;
      this.table.dataSource = this.dataSource;
      this.changeDetectorRefs.detectChanges();
    })
  }

  public pageChangeEvent(event: PageEvent) {
    this.filter.rows = event.pageSize;
    this.filter.page = event.pageIndex;
    this.setFilter();
  }

  toggleSearchBar() {
    this.filter.hidden = !this.filter.hidden;
    this.filter.entity = {
      id: undefined,
      business_name: undefined,
      city: undefined,
      contact: undefined,
      country: undefined,
      external_number: undefined,
      county: undefined,
      internal_number: undefined,
      postal_code: undefined,
      region: undefined,
      settlement: undefined,
      state: undefined,
      street: undefined,
      tax_id: undefined,
      telephone: undefined,
      email: undefined,
    }
  }

  public addRow() {
    const entity: ICustomer = {
      id: 0,
      business_name: '',
      city: '',
      contact: '',
      country: 0,
      external_number: '',
      county: '',
      internal_number: '',
      postal_code: '',
      region: null,
      settlement: '',
      state: 0,
      street: '',
      tax_id: '',
      telephone: '',
      email: '',
    }
    this.showForm(entity);
  }

  public showForm(entity: ICustomer) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '50%',
      maxHeight: '85%',
      data: { entity: entity },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.save(result.entity).then(response => {
          this.setFilter();
        });
      }
    });
  }

  delete(entity: ICustomer): void {
    const dialogRef = this.confirmationDialogService.showConfirmationDialog('¿Desea eliminar el registro?');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(entity).then(response => {
          const snacBarRef = this.snackBar.open(response.message, 'Deshacer', {
            duration: 3000
          });
          this.setFilter();

          snacBarRef.onAction().subscribe(() => {
            this.customerService.save(entity).then(response => {
              this.setFilter();
            });
          });
        });

      }
    });
  }

}
