import { Component, OnInit,Injectable,NgZone, Output,EventEmitter } from '@angular/core';
import { CurrentUser } from '../../../Model/current-user';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Model/user';
import { HttpService } from '../../../Services/http-service.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router'; 
import { NotificationService } from '../../../Services/notification.service';

@Injectable()
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {

	
  ngZone: NgZone;
  user: User;
  errorText : string;
  response: any;
  @Output() messageEvent = new EventEmitter<string>();
  
  constructor(public httpService: HttpService, private router: Router, private authService: AuthService, private  notifService : NotificationService) { 
	this.ngZone = new NgZone({enableLongStackTrace: false});
	this.user = {
		'username' : '',
		'password' : ''
	}
	this.errorText = "";
  }
  
  

  ngOnInit() {
  }
  
  loginUser(): boolean {
	if(this.user.username.length == 0 || this.user.password.length == 0){
		this.errorText = "All fields are required";
		return false;
	}
	else
	{
		this.errorText = "";
	}
	
    console.log('Dobili smo: ', JSON.stringify(this.user));
	this.httpService.logIn(this.user).subscribe(
      (res: any) => {
						this.response = res;
						let data = res.json();
            let role = res.headers.get("role");
            let email = res.headers.get("email");
            if(data && data.access_token)  
            {
              this.httpService.getUserOnSession(this.user.username,data.access_token).subscribe(
                res => {
                  // console.log(res);
                  let currentUser: CurrentUser;
                  
                  currentUser = new CurrentUser(res.LoggedIn,res.Username,res.Name,res.Surname,role,data.access_token,res.Contact,res.BirthDate,email, this.user.password,res.Approved,res.CreateService,res.Path,res.Id);
                  console.log(currentUser);
                  this.authService.logIn(currentUser);
                  this.notifService.RegisterForNotifications();
                  this.messageEvent.emit("ok");
                  if(role == "Admin")
                  {
                    this.notifService.GetNotification();
                  }
                  //this.header.refreshView();
                  //window.location.reload();
                  // this.notifService.GetNotification();
                }
              )
            }         

                    },
      error => {
                  console.log(error);
                  this.errorText = "Your data are not valid";
               }

    );
    return false; 
  }

}
