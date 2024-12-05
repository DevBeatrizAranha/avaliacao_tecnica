import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL = 'https://localhost:3000';

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(`${this.SERVER_URL}/user`)
  }
}
