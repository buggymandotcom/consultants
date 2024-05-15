import { Component, OnInit } from '@angular/core';
import {User} from "../../../../core/auth/models/user.model";
import {AuthService} from "../../../../core/auth/services/authentication.service";
import {UserService} from "../../../../shared/services/user.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    user: User = new User({});

  constructor(
      private authService:AuthService
  ) {  }

  ngOnInit() {
      this.authService.loggedUser$.subscribe(user=>{
          this.user = user.id ? user : UserService.userLocal();
      });
  }

}
