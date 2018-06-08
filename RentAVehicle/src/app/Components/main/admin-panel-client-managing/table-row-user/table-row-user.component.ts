import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AuthService } from '../../../../Services/auth.service';
import { HttpService } from '../../../../Services/http-service.service';
import { AppUser } from '../../../../Model/app-user';
import { CurrentUser } from '../../../../Model/current-user';

@Injectable()
@Component({
  selector: 'app-table-row-user',
  templateUrl: './table-row-user.component.html',
  styleUrls: ['./table-row-user.component.css']
})
export class TableRowUserComponent implements OnInit {

  @Input() user: AppUser
  client : boolean;
  manager : boolean;
  unverified : boolean;
  currUserPom : CurrentUser;

  constructor(private http: HttpService, private authService: AuthService) {
    this.client = false;
    this.manager = false;
    this.unverified = false;
   }

  ngOnInit() {
    this.refresh();
  }

  refresh()
  {
    if(this.user.Role == "AppUser" && this.user.Approved)
    {
      this.client = true;
      this.unverified = false;
      this.manager = false;
    }
    else if(this.user.Role == "AppUser" && !this.user.Approved)
    {
      this.unverified = true;
      this.client = false;
      this.manager = false;
    }
    else if(this.user.Role == "Manager" && this.user.Approved)
    {
      this.manager = true;
      this.client = false;
      this.unverified = false;
    }
    else if(this.user.Role == "Manager" && !this.user.Approved)
    {
      this.unverified = true;
      this.client = false;
      this.manager = false;
    }
  }

  verifyUser()
  {
    this.user.Approved = true;
    this.http.approveUser(this.user, this.authService.currentUserToken(),true).subscribe(
      (res : any) => { 
          this.refresh();
      },
      error =>{
          console.log(error);
          window.alert(error);
      });
  }

  viewDocument()
  {
    //todo
  }

  checkedChange()
  {
    if (this.user.CreateService == false) {
      this.authService.ServiceCreationRight(this.user, this.authService.currentUserToken(), false).subscribe(
        (res : any) => { 
            this.refresh();
        },
        error =>{
            console.log(error);
            window.alert(error);
        });
    } else {
      this.authService.ServiceCreationRight(this.user, this.authService.currentUserToken(), true).subscribe(
        (res : any) => { 
            this.refresh();
        },
        error =>{
            console.log(error);
            window.alert(error);
        });
    }
  }

}
