import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidepanelLeftComponent } from './components/sidepanel-left/sidepanel-left.component';
import { SidepanelRightComponent } from './components/sidepanel-right/sidepanel-right.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './components/shared/shared.module';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaymentsComponent } from './components/payments/payments.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { TranslatePipe } from './components/shared/pipes/translate.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidepanelLeftComponent,
    SidepanelRightComponent,
    DashboardComponent,
    AccountDetailsComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PaymentsComponent,
    LanguageSwitchComponent,
    TranslatePipe
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en', // Język domyślny
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
