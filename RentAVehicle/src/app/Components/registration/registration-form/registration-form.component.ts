import { Component, OnInit,Injectable,NgZone } from '@angular/core';
import { CurrentUser } from '../../../Model/current-user';
import { AppUser } from '../../../Model/app-user';
import { HttpService } from '../../../Services/http-service.service'; 

@Injectable()
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  ngZone: NgZone;
  user: AppUser
	
  constructor(public httpService: HttpService) { 
	this.ngZone = new NgZone({enableLongStackTrace: false});
	this.user = {
		'username' : '',
		'password' : '',
		'name' : '',
		'surname' : '',
		'birth' : '',
		'contact' : '',
		'email' : ''
	}
  }

  registerResponse: any;  
  
  ngOnInit() {
  }
  
    registerUser(): boolean {
    console.log(`Dobili smo: ${this.user.username} i : ${this.user.password} i ${this.user.name} i ${this.user.email}`);
    return false; 
  }

}
