import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';
import { Session } from 'src/app/interfaces/session';
import { IModule } from 'src/app/interfaces/module';
import { Module, MODULES, Submodule } from 'src/app/modules';
import { ISubmodule } from 'src/app/interfaces/submodule';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @SessionStorage(constants.SESSION)
  session: Session;

  modules: Array<Module> = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.modules = this.buildMenu(this.session.user.modules);
  }

  public goto(action: string) {
    this.router.navigate([action]);
  }

  private buildMenu(permissions: Array<IModule>): Array<Module> {
    const modules: Array<Module> = [];
    const mods = MODULES.map(a => ({ ...a }));
    mods.forEach(module => {
      let permission: IModule;
      if (permissions.some(p => {
        permission = p;
        return p.id === module.id;
      })) {
        module.submodules = module.submodules.filter(sm => {
          return permission.submodules.some(s => sm.id === s.id);
        });
        modules.push(module);
      }
    });

    return modules;
  }

  public navigate(submodule: Submodule) {
    this.router.navigate([submodule.uri]).then(() => {
      this.navigationService.navigate(submodule);
    });
  }

}
