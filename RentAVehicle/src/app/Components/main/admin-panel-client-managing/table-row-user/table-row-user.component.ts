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
    if(this.user.Role == "Client" && this.user.approved)
    {
      this.client = true;
    }
    else if(this.user.Role == "Client" && !this.user.approved)
    {
      this.unverified = true;
    }
    else if(this.user.Role == "Manager")
    {
      this.manager = true;
    }
  }

  verifyUser()
  {
    this.user.approved = true;
    this.http.approveUser(this.user.Id, this.authService.currentUserToken(),true).subscribe(
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

  removeServiceCreationRight(checkboxElem)
  {
    if (checkboxElem.checked) {
      alert ("hi");
    } else {
      alert ("bye");
    }
  }

}
