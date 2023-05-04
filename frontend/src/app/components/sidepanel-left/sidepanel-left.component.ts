import { Component, OnInit } from '@angular/core';
import { IPerson, Person } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidepanel-left',
  templateUrl: './sidepanel-left.component.html',
  styleUrls: ['./sidepanel-left.component.scss']
})

export class SidepanelLeftComponent implements OnInit {
  person: Person | null;

  get fullName(): string {
    return this.person ? this.person.getFullName() : 'My name';
  }

  constructor(
    private authService: AuthService
  ) {
    this.person = null;
  }

  ngOnInit(): void {
    this.person = new Person(this.authService.userValue as IPerson);
  }

  logOut(): void {
    this.authService.logout();
  }

}
