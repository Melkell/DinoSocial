import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

@Injectable()

export class UserService {
  selectedUser: User ;
  users: User[];
  readonly baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(this.baseURL+'/register',user);
  }
}