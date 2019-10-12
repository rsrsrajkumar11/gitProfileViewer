import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  private serverUrl = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  searchUser(search: string,perPage:number,page:number) {
    return new Promise((resolve, reject) => {
      let data;
      this.http.get(this.serverUrl + `search/${search}/${perPage}/${page}`)
        .subscribe(
          Response => {
            console.log("response", Response);
            data = Response;
          },
          err => {
            console.log(err);
            reject(err);
          },
          () => {
            console.log("request finished");
            resolve(data);
          })
    });
  }

  findUserDetails(id: string) {
    return new Promise((resolve, reject) => {
      let data;
      this.http.get(this.serverUrl + `users/${id}`)
        .subscribe(
          Response => {
            console.log("response", Response);
            data = Response;
          },
          err => {
            console.log(err);
            reject(err);
          },
          () => {
            console.log("request finished");
            resolve(data);
          })
    });
  }
}
