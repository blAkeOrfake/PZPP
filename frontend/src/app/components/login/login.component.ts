import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = 'Login';
  errorMessage: string = '';
  form!: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onClick() {
    this.submitted = true;

    this.errorMessage = 'Invalid username or password';

    // reset alerts on submit
    // this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                this.alertService.error(error);
                console.log(error);
                this.loading = false;
            }
        });
    // sessionStorage.setItem('isLoggedIn', 'true');
    // window.location.reload();
    // this.router.navigate(['/dashboard']);
}

}
