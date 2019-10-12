import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from './../search-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string = '';
  viewUserArry: any = [];
  pageNum: number = 1;
  perPage: number = 20;
  showLoader: boolean = false;
  constructor(private searchUserService: SearchUsersService, private router: Router) { }

  ngOnInit() {
  }

  async search() {
    console.log("searchText", this.searchText);
    this.showLoader = true;
    if (!this.searchText) {
      this.showLoader = false;
      return;
    }
    let userData: any = await this.searchUserService.searchUser(this.searchText, this.perPage, this.pageNum)
    if (userData && userData.length) {
      this.viewUserArry = userData;
    }
    this.showLoader = false;
  }

  viewUser(id: string) {
    this.router.navigate(['user', id]);
  }

  onScrollDown() {
    this.pageNum++;
    console.log("this.pageNum", this.pageNum);
    this.showLoader = true;
    this.searchUserService.searchUser(this.searchText, this.perPage, this.pageNum)
      .then((userData: any) => {
        if (userData && userData.length)
          this.viewUserArry = [...this.viewUserArry, ...userData];
      })
    this.showLoader = false;

  }
}

