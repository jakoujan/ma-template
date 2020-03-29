import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Submodule } from '../modules';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigator = new Subject<Submodule>();

  public $navigator = this.navigator.asObservable()

  constructor() { }

  public navigate(submodule: Submodule) {
    this.navigator.next(submodule);
  }
}
