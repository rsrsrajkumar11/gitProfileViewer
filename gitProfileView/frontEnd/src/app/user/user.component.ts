import { LoaderService } from './../loader.service';
import { LoaderComponent } from './../loader/loader.component';
import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from './../search-users.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: any;
  private showLoader: boolean = true;
  constructor(private router: ActivatedRoute, private searchUserService: SearchUsersService) { }

  ngOnInit() {
    this.showLoader = true;
    this.router.params.subscribe(data => {
      this.searchUserService.findUserDetails(data.id)
        .then(userDetails => {
          this.user = userDetails;
          this.showLoader = false;
        }).catch(err => {
          this.showLoader = false;
        })
    })
  }

}
