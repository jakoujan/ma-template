import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { Item } from 'src/app/interfaces/item';
import { STATES, COUNTRIES } from 'src/app/catalogs/catalogs';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  generalDataForm: FormGroup;
  addressForm: FormGroup;

  states: Array<Item> = STATES;
  countries: Array<Item> = COUNTRIES;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.generalDataForm = this.fb.group({
      business_name: [this.data.entity.business_name, Validators.required],
      telephone: [this.data.entity.telephone, Validators.required],
      contact: [this.data.entity.contact, Validators.required],
      email: [this.data.entity.email, Validators.compose([Validators.required, Validators.email])],
      tax_id: [this.data.entity.tax_id, Validators.required]
    });
    this.addressForm = this.fb.group({
      street: [this.data.entity.street, Validators.required],
      internal_number: [this.data.entity.internal_number],
      external_number: [this.data.entity.external_number, Validators.required],
      settlement: [this.data.entity.settlement, Validators.required],
      city: [this.data.entity.city, Validators.required],
      county: [this.data.entity.county, Validators.required],
      state: [this.data.entity.state, Validators.required],
      postal_code: [this.data.entity.postal_code, Validators.required],
      country: [this.data.entity.country, Validators.required]
    });
    this.form = this.fb.group({
      generalData: this.generalDataForm,
      addressData: this.addressForm
    });
  }

  ngAfterViewInit() {

  }

  save() {
    this.data.entity.business_name = this.generalDataForm.controls.business_name.value;
    this.data.entity.tax_id = this.generalDataForm.controls.tax_id.value;
    this.data.entity.contact = this.generalDataForm.controls.contact.value;
    this.data.entity.telephone = this.generalDataForm.controls.telephone.value;
    this.data.entity.email = this.generalDataForm.controls.email.value;
    this.data.entity.street = this.addressForm.controls.street.value;
    this.data.entity.internal_number = this.addressForm.controls.internal_number.value;
    this.data.entity.external_number = this.addressForm.controls.external_number.value;
    this.data.entity.settlement = this.addressForm.controls.settlement.value;
    this.data.entity.city = this.addressForm.controls.city.value;
    this.data.entity.county = this.addressForm.controls.county.value;
    this.data.entity.state = this.addressForm.controls.state.value;
    this.data.entity.postal_code = this.addressForm.controls.postal_code.value;
    this.data.entity.country = this.addressForm.controls.country.value;

    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }


}

