import { SessionStorage } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { Session } from 'src/app/interfaces/session';
import { AfterViewInit, Component } from '@angular/core';
import { Action, Submodule } from "src/app/modules";
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { ISubmodule } from 'src/app/interfaces/submodule';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export class BaseComponent {

  @SessionStorage(constants.SESSION)
  session: Session;

  ref: Subscription;

  public permission: Action = {
    access: false,
    id: undefined,
    name: undefined,
    write: false
  }

  constructor(protected navigationService: NavigationService) {
    this.ref = this.navigationService.$navigator.subscribe(submodule => {
      const modules = this.session.user.modules;
      modules.some(module => {
        const s: ISubmodule = module.submodules.filter(sub => submodule.id === sub.id)[0];
        if (s) {
          this.permission = {
            access: s.access,
            id: s.id,
            name: '',
            write: s.write
          }
          return true;
        }
      });
    });
  }

  destroy() {
    this.ref.unsubscribe();
  }

  public disable(value: boolean) {
    return !value;
  }
}
