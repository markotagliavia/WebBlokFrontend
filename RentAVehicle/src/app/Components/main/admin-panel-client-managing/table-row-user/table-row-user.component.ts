import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AuthService } from '../../../../Services/auth.service';
import { AppUser } from '../../../../Model/app-user';

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

  constructor() {
    this.client = false;
    this.manager = false;
    this.unverified = false;
   }

  ngOnInit() {
            if(this.user.Role == "Client" && this.user.Odobren)
            {
              this.client = true;
            }
            else if(this.user.Role == "Client" && !this.user.Odobren)
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
    //to do
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
