import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../url.constant';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(private http: HttpClient) { }

  getTab() {
    return this.http.get<any>(apiUrl.tab);
  }
}
