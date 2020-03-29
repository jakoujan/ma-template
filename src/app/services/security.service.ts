import { Injectable } from '@angular/core';
import { Service, ContentType } from './service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user';
import { Subject, Observable } from 'rxjs';
import { ISecureResponse } from '../interfaces/secure-response';
import { SpinnerService } from './spinner.service';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends Service {

  private static LOGIN = '/oauth/token';
  private static LOGOUT = 'api/security/logout';

  private accessorEmitter: Subject<IUser> = new Subject<IUser>();

  constructor(protected http: HttpClient, protected spinner: SpinnerService, protected ps: SessionStorageService) {
    super(http, spinner, ps);
  }

  public login(user: IUser, type: ContentType, message: string): Promise<IResponse> {
    return this.preparePromisePost(SecurityService.LOGIN, user, message);
  }

  public setUserData(): Observable<IUser> {
    return this.accessorEmitter.asObservable();
  }

  public updateUserData(user: IUser) {
    this.accessorEmitter.next(user);
  }

  public logout(user: IUser): Promise<IResponse> {
    return this.preparePromiseEntityPost(SecurityService.LOGOUT, user);
  }


}
