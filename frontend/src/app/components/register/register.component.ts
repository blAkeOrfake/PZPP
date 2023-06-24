import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

interface IShow {
  [key: string]: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showErrorMessage: boolean = false;
  form!: FormGroup;
  loading = false;
  submitted = false;
  contact: boolean = false;

  private _show:IShow = {};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      contactAddress: [''],
      contactCity: [''],
      contactPostalCode: [''],
      taxAddress: [''],
      taxCity: [''],
      taxPostalCode: [''],
    });
  }

  get f() { return this.form.controls; }

  showForm(key: string): boolean {
    return this._show[key];
  }

  onClickShowForm(key: string): void {
    this._show[key] = !this._show[key];
  }

  onClick() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    if (this.f['password'].value !== this.f['confirm_password'].value) {
      this.showErrorMessage = true;
      this.loading = false;
      return;
    }

    this.authService.register(this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
}

}
