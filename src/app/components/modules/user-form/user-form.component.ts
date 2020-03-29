import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { Module, MODULES, Submodule, Permission, Action } from "src/app/modules";
import { buildFormPermissions, buildUserPermissions } from 'src/app/helpers/helpers';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { validateName } from 'src/app/helpers/validation-helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  modules: Array<Module> = MODULES.map(a => ({ ...a }));
  permissions: Array<Permission> = [];
  panelOpenState = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.data.entity.name, Validators.required],
      username: [this.data.entity.username, Validators.required, validateName(this.userService)],
      email: [this.data.entity.email, Validators.compose([Validators.required, Validators.email])],
    });
    if (this.data.entity.id !== 0) {
      this.userForm.controls.username.disable();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.permissions = buildFormPermissions(this.modules, this.data.entity.modules);
    });
  }

  accessCheckboxChange(submodule: Action, $event) {
    submodule.access = $event.checked;
  }

  writeCheckboxChange(submodule: Action, $event: MatCheckboxChange) {
    submodule.write = $event.checked;
    if ($event.checked) {
      submodule.access = true;
    }
  }

  save() {
    this.data.entity.username = this.userForm.controls.username.value;
    this.data.entity.name = this.userForm.controls.name.value;
    this.data.entity.email = this.userForm.controls.email.value;
    this.data.entity.modules = buildUserPermissions(this.permissions);
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }


}
