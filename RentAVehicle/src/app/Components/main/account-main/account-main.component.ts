import { Component, OnInit } from '@angular/core';
import { User } from '../../../Model/user';
import { IdentityUser } from '../../../Model/identity-user';
import { HttpService } from '../../../Services/http-service.service'; 
import {AuthService } from '../../../Services/auth.service'

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.css']
})
export class AccountMainComponent implements OnInit {

  regUser : IdentityUser;
  errorTextLogin : string;
  errorTextReg : string;
  selectedFile: File; 

  constructor(private http: HttpService, private authService: AuthService) {
    

    this.regUser = {
      'username' :  this.authService.currentUserName(),
      'confirmPassword' : '',
      'password' : '',
      'name' : this.authService.currentUserName(),
      'surname' : this.authService.currentUserSurname(),
      'birth' : this.authService.currentUserBirth(),
      'contact' : this.authService.currentUserContact(),
      'email' : this.authService.currentUserEmail(),
      'createService' : false
    }

    this.errorTextLogin = '';
    this.errorTextReg = '';
   }

  ngOnInit() {
  }

  changeLogin()
  {
    if(this.regUser.password.length == 0 || this.regUser.confirmPassword.length == 0){
      this.errorTextLogin = "All fields are required";
      return false;
    }
    else
    {
      if(this.regUser.password.length < 5)
      {
        this.errorTextLogin = "Password must have minimum 6 characters";
        return false;
      }
      else
      {
        if(this.regUser.confirmPassword != this.regUser.password)
        {
          this.errorTextLogin = "Password must be the same";
          return false;
        }

        this.authService.changePassword(this.authService.currentUserPassword(),this.regUser.password,this.regUser.confirmPassword,this.authService.currentUserToken()).subscribe(
            (res : any) =>
            {
              this.errorTextLogin = "";
              alert("Successful change password");
            },
            error =>
            {
                this.errorTextLogin ="Sever internal error";
            }
            
        )
        
      }
    }
    return false;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  changeReg()
  {
    


    if(this.regUser.name.length == 0 
      || this.regUser.surname.length == 0 || this.regUser.birth.length == 0 || this.regUser.contact.length == 0 || this.regUser.email.length == 0){
      this.errorTextReg = "All fields except document are required";
      return false;		
      }
    else
    {
      if(this.regUser.name.length < 2)
      {
        this.errorTextReg = "Name must have minimum 2 characters";
        return false;
      }
      if(this.regUser.surname.length < 2)
      {
        this.errorTextReg = "Surname must have minimum 2 characters";
        return false;
      }
      if(!this.regUser.email.includes('@'))
      {
        this.errorTextReg = "Invalid email";
        return false;
      }
      this.errorTextReg = "";
    }
     // console.log(`Dobili smo: `, JSON.stringify(this.regUser));

     this.http.uploadPicture(this.authService.currentUserId(),this.selectedFile,this.authService.currentUserToken()).subscribe
     (
           (res : any) => {
                   alert(res._body);
           },
           error =>
           {
                   alert(error.json().Message);
           }
     )

      return false; 
  }

}
