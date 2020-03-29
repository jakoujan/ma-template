import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ICustomerFilter } from '../filters/customer-filter';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends Service {

  private static CUSTOMER_LIST = 'api/customers/list';
  private static CUSTOMER_SAVE = '/api/customers/save';
  private static CUSTOMER_DELETE = '/api/customers/delete';



  constructor(protected http: HttpClient, protected spinner: SpinnerService, protected ps: SessionStorageService) {
    super(http, spinner, ps);
  }

  public filter(filter: ICustomerFilter): Promise<IResponse> {
    return this.preparePromiseFilterPost(CustomerService.CUSTOMER_LIST, filter);
  }

  public save(user: ICustomer): Promise<IResponse> {
    return this.preparePromiseEntityPost(CustomerService.CUSTOMER_SAVE, user);
  }

  public delete(user: ICustomer): Promise<IResponse> {
    return this.preparePromiseEntityPost(CustomerService.CUSTOMER_DELETE, user);
  }
}
