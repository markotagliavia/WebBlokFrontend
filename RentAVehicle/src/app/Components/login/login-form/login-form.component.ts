import { Component, OnInit,Injectable,NgZone } from '@angular/core';
import { CurrentUser } from '../../../Model/current-user';
import { User } from '../../../Model/user';
import { HttpService } from '../../../Services/http-service.service'; 

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
  
  constructor(public httpService: HttpService) { 
	this.ngZone = new NgZone({enableLongStackTrace: false});
	this.user = {
		'username' : '',
		'password' : ''
	}
	this.errorText = "";
  }
  
  registerResponse: any;

  ngOnInit() {
  }
  
  loginUser(): boolean {
	if(this.user.username.length == 0){
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
                        console.log('token: ${data.access_token}');

                    },
      error => {
                  

                  console.log(error);
               }

    );
    return false; 
  }

}
