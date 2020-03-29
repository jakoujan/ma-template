import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SecurityService } from 'src/app/services/security.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { Session } from 'src/app/interfaces/session';
import { ContentType } from 'src/app/services/service';
import { SessionStorageService } from 'ngx-webstorage';
import { constants } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Template';
  loginForm: FormGroup;
  user: IUser;


  constructor(
    private router: Router,
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const user: IUser = {
      username: this.loginForm.controls.user.value,
      email: undefined,
      id: undefined,
      modules: undefined,
      password: this.loginForm.controls.password.value,
      name: undefined
    }

    this.securityService.login(user, ContentType.JSON, 'Autenticando').then(response => {
      if (response.code === 200) {
        const session: Session = {
          user: response.fields.user,
          csrf: response.fields.csrf,
          token: response.fields.token
        }
        this.sessionStorage.store(constants.SESSION, session);
        this.router.navigate(['modules/dashboard']);
      } else if (response.code === 403) {

      }
    });
  }

}
