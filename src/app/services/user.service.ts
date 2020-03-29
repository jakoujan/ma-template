import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { SessionStorageService } from 'ngx-webstorage';
import { IUserFilter } from '../filters/user-filter';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  private static USER_LIST = 'api/users/list';
  private static USER_SAVE = 'api/users/save';
  private static USER_DELETE = 'api/users/delete';
  private static USER_EXISTS = 'api/users/exists';



  constructor(protected http: HttpClient, protected spinner: SpinnerService, protected ps: SessionStorageService) {
    super(http, spinner, ps);
  }

  public filter(filter: IUserFilter): Promise<IResponse> {
    return this.preparePromiseFilterPost(UserService.USER_LIST, filter);
  }

  public save(user: IUser): Promise<IResponse> {
    return this.preparePromiseEntityPost(UserService.USER_SAVE, user);
  }

  public delete(user: IUser): Promise<IResponse> {
    return this.preparePromiseEntityPost(UserService.USER_DELETE, user);
  }

  public isNameExists(user: string): Observable<HttpEvent<IResponse>> {
    const params = [user];
    return this.http.get<IResponse>(Service.appendParams(UserService.USER_EXISTS, params), this.getOptions());
  }
}
