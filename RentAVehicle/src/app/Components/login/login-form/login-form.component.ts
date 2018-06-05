import { Component, OnInit,Injectable,NgZone } from '@angular/core';
import { CurrentUser } from '../../../Model/current-user';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Model/user';
import { HttpService } from '../../../Services/http-service.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router'; 

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
  
  constructor(public httpService: HttpService, private router: Router, private authService: AuthService) { 
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
            if(data && data.access_token)  
            {
              this.httpService.getUserOnSession(this.user.username,data.access_token).subscribe(
                res => {
                  // console.log(res);
                  let currentUser: CurrentUser;
                  
                  currentUser = new CurrentUser(res.LoggedIn,res.Username,res.Name,res.Surname,role,data.access_token,res.Id);
                  console.log(currentUser);
                  this.authService.logIn(currentUser);
                  //this.header.refreshView();
                  this.router.navigate(['/home/login']);
                }
              )
            }         

                    },
      error => {
                  console.log(error);
               }

    );
    return false; 
  }

}
