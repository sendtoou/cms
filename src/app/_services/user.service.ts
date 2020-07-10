import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { apiUrl } from '../url.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(apiUrl.user);
  }

//   getCampageUrl(uuid){
//     return environment.apiUrl + '/campaign/'+uuid+'/activation/';
//  }
  getById(id: string) {
    // return this.http.get<User>(`${apiUrl.user}/${id}`);
    return this.http.get<User>(apiUrl.user + '/' + id );
  }
}
