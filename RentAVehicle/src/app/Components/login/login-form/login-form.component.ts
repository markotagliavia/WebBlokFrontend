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
  
  constructor(public httpService: HttpService) { 
	this.ngZone = new NgZone({enableLongStackTrace: false});
	this.user = {
		'username' : '',
		'password' : ''
	}
  }
  
  registerResponse: any;

  ngOnInit() {
  }
  
  loginUser(): boolean {
    console.log('Dobili smo: ${this.user.username} i ${this.user.password}');
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
