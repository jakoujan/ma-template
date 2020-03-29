import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UsersDataSource } from './users-datasource';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { IUserFilter } from "src/app/filters/user-filter";
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from '../../common/ui/confirmation-dialog/confirmation-dialog.service';
import { BaseComponent } from '../base-component/base-component.component';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IUser>;
  dataSource: UsersDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions', 'username', 'email'];
  filter: IUserFilter = {
    entity: {
      id: undefined,
      name: '',
      username: undefined,
      email: undefined,
      modules: undefined
    },
    startDate: undefined,
    endDate: undefined,
    hidden: true,
    page: 0,
    rows: 20
  }
  constructor(
    private userService: UserService,
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
    this.userService.filter(this.filter).then(response => {
      this.dataSource = new UsersDataSource();
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
      name: undefined,
      username: undefined,
      email: undefined,
      modules: undefined
    }
  }

  public addRow() {
    const entity: IUser = {
      id: 0,
      email: '',
      modules: [],
      name: '',
      username: ''
    }
    this.showForm(entity);
  }

  public showForm(entity: IUser) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '50%',
      maxHeight: '85%',
      data: { entity: entity },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.save(result.entity).then(response => {
          this.setFilter();
        });
      }
    });
  }

  delete(entity: IUser): void {
    const dialogRef = this.confirmationDialogService.showConfirmationDialog('¿Desea eliminar el registro?');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(entity).then(response => {
          const snacBarRef = this.snackBar.open(response.message, 'Deshacer', {
            duration: 3000
          });
          this.setFilter();

          snacBarRef.onAction().subscribe(() => {
            this.userService.save(entity).then(response => {
              this.setFilter();
            });
          });
        });

      }
    });
  }
}
