import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  education: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = `${environment.apiUrl}/Users`; 

  constructor(private http: HttpClient) { }

  getUsers(name?: string, dateOfBirth?: string, email?: string, education?: string): Observable<User[]> {
    let params = new HttpParams();
    

    if (name) {
      params = params.set('name', name);
    }
    if (dateOfBirth) {
      params = params.set('dateOfBirth', dateOfBirth);
    }
    if (email) {
      params = params.set('email', email);
    }
    if  (education) {
      params = params.set('education', education);
    }

    return this.http.get<User[]>(this.apiUrl, { params });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  searchUsers(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('name', searchTerm);  
    return this.http.get<any>(this.apiUrl, { params });
  }
}
