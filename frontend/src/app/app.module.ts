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

@NgModule({
  declarations: [
    AppComponent,
    SidepanelLeftComponent,
    SidepanelRightComponent,
    DashboardComponent,
    AccountDetailsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
