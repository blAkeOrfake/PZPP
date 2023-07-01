import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERoutes } from 'src/app/helpers/routes';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showErrorMessage: boolean = false;
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

    this.showErrorMessage = true;

    // reset alerts on submit
    // this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;
    // this.authService.login(this.f['username'].value, this.f['password'].value)
    //     .subscribe(() => {
    //             this.loading = false;
    //             this.router.navigate([ERoutes.Dashboard]);
    //             localStorage.setItem('userId', user.id);
    //       },
    //       (err) => {
    //         this.alertService.error(err);
    //         console.log(err);
    //         this.loading = false;
    //       }
    //     );

    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(
        (user) => {
          // Save user ID in localStorage upon successful login
          localStorage.setItem('userId', user.id);

          // Redirect to dashboard
          this.router.navigate([ERoutes.Dashboard]);
        },
        (err) => {
          // Handle login error
          this.alertService.error(err);
          console.log(err);
          this.loading = false;
        }
      );

    // ...
  }

        //   {
        //     next: () => {
        //         // get return url from query parameters or default to home page
        //         // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //         console.log('navigating to dashboard');
        //         this.router.navigate([ERoutes.Dashboard]);
        //     },
        //     error: error => {
        //         this.alertService.error(error);
        //         console.log(error);
        //         this.loading = false;
        //     }
        // });
    // sessionStorage.setItem('isLoggedIn', 'true');
    // window.location.reload();
    // this.router.navigate(['/dashboard']);
}


