import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router'; 

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  client : boolean;
  manager : boolean;
  admin : boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.client = false;
    this.manager = false;
    this.admin = false;
   }

  ngOnInit() {
    this.refreshView();
  }

  refreshView()
  {
    if(this.authService.currentUserName() != undefined)
    {
        if(this.authService.currentUserName().length > 0)
        {
            if(this.authService.isLoggedInRole('Admin'))
            {
              this.admin = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('Manager'))
            {
              this.manager = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('AppUser'))
            {
              this.client = true;
            }
        }
    }
  }

  logOut()
  {
    this.authService.logOut();
    this.router.navigate(['/home/login']);
  }

}
