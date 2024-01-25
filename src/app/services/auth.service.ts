import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './env';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(`${url}/api/user/`);
  }
  
  authUser(uname: string, pass: string) {
    return this.http.post<any>(`${url}/api/user/auth`, { username: uname, password: pass });
  }
  
  registerUser(name: string, uname: string, pass: string) {
    // return this.http.post<any>(`${url}/api/user/register`, { name: name, username: uname, password: pass });
    return this.http.post<any>(`${url}/api/user/`, { name: name, username: uname, password: pass });
  }

  getUser(id:string | null) {
    return this.http.get<any>(`${url}/api/user/${id}`);
  }

  getUserByUsername(username:string | null) {
    return this.http.get<any>(`${url}/api/user/search/${username}`);
  }

  // decPass(id:string | null, pass:string | null) {
  //   return this.http.post<any>(`${url}/api/user/decpass`, { id: id, password: pass });
  // }

  updateUser(
    id: string | null,
    uname: string | null,
    pass: string | null,
    email: string | null) {

    return this.http.put<any>(`${url}/api/user`, { id: id, username: uname, password: pass, email: email });
  }

  // updateUserPass(
  //   id: string | null,
  //   uname: string | null,
  //   email: string | null,
  //   pass: string | null,
  //   encKey: string | null) {

  //   return this.http.put<any>(`${url}/api/user/pass`, { id: id, username: uname, email: email, password: pass, encKey: encKey });
  // }

  deleteUser(id: string | null) {
    return this.http.delete<any>(`${url}/api/user/${id}`);
  }
}
