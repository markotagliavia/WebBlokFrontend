import { Component, OnInit,Injectable,NgZone } from '@angular/core';
import { CurrentUser } from '../../../Model/current-user';
import { IdentityUser } from '../../../Model/identity-user';
import { HttpService } from '../../../Services/http-service.service'; 

@Injectable()
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  ngZone: NgZone;
  user: IdentityUser
  errorText : string
	
  constructor(public httpService: HttpService) { 
	this.ngZone = new NgZone({enableLongStackTrace: false});
	this.user = {
		'username' : '',
		'confirmPassword' : '',
		'password' : '',
		'name' : '',
		'surname' : '',
		'birth' : '',
		'contact' : '',
		'email' : ''
	}
	this.errorText = "";
  }

  registerResponse: any;  
  
  ngOnInit() {
  }
  
  registerUser(): boolean {
	if(this.user.username.length == 0 || this.user.password.length == 0 || this.user.name.length == 0 
		|| this.user.surname.length == 0 || this.user.birth.length == 0 || this.user.contact.length == 0 || this.user.email.length == 0){
		this.errorText = "All fields except document are required";
		return false;		
    }
	else
	{
		if(this.user.username.length < 5) 
		{
			this.errorText = "Username must have minimum 6 characters";
			return false;
		}
		if(this.user.password.length < 5)
		{
			this.errorText = "Password must have minimum 6 characters";
			return false;
		}
		else
		{
			if(this.user.confirmPassword != this.user.password)
			{
				this.errorText = "Password must be the same";
				return false;
			}
		}
		if(this.user.name.length < 2)
		{
			this.errorText = "Name must have minimum 2 characters";
			return false;
		}
		if(this.user.surname.length < 2)
		{
			this.errorText = "Surname must have minimum 2 characters";
			return false;
		}
		if(!this.user.email.includes('@'))
		{
			this.errorText = "Invalid email";
			return false;
		}
		this.errorText = "";
	}
		this.httpService.register(this.user).subscribe
		(
			(res: any) => {
				
				console.log("AppUser created successfully "+ res);
	
				},
			error => {
		
				console.log("ERROR " + error);
			}
		)
			
		
    return false; 
  }

}
