import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, IUser, IPerson, Person } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.apiUrl + '/user';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get(`${this.usersUrl}`).pipe(map((response: any) => {
      return response.map((x: any) => new User(x))
    }));
  }

  getUserById(userId: number): Observable<IUser> {
    return this.httpClient.get(`${this.usersUrl}/${userId}`).pipe(map((response: any) => new User(response)));
  }

  registerUser(user: User): Observable<IUser> {
    return this.httpClient.post(`${this.usersUrl}/register`, user).pipe(map((response: any) => new User(response)));
  }

  updateUser(userId: number, user: User): Observable<IUser> {
    return this.httpClient.put(`${this.usersUrl}/${userId}`, user).pipe(map((response: any) => new User(response)));
  }

  deleteUser(userId: number): Observable<IUser> {
    return this.httpClient.delete(`${this.usersUrl}/${userId}`).pipe(map((response: any) => new User(response)));
  }

  loginUser(user: User): Observable<IUser> {
    return this.httpClient.post(`${this.usersUrl}/login`, user).pipe(map((response: any) => new User(response)));
  }
}
