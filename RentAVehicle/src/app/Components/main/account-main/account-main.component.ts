import { Component, OnInit } from '@angular/core';
import { User } from '../../../Model/user';
import { AppUser } from '../../../Model/app-user';

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.css']
})
export class AccountMainComponent implements OnInit {

  loginUser : User;
  regUser : AppUser;
  errorTextLogin : string;
  errorTextReg : string 

  constructor() {
    this.loginUser = {
        'username' : 'Admin',
        'password' : ''
    }

    this.regUser = {
      'Username' : '',
      'Password' : '',
      'Name' : '',
      'Surname' : '',
      'Birth' : '',
      'Contact' : '',
      'Email' : '',
      'Odobren' : false,
      'Role' : ''
    }

    this.errorTextLogin = '';
    this.errorTextReg = '';
   }

  ngOnInit() {
  }

  changeLogin()
  {
    if(this.loginUser.password.length == 0){
      this.errorTextLogin = "All fields are required";
      return false;
    }
    else
    {
      this.errorTextLogin = "";
    }
  }

  changeReg()
  {
    if(this.regUser.Name.length == 0 
      || this.regUser.Surname.length == 0 || this.regUser.Birth.length == 0 || this.regUser.Contact.length == 0 || this.regUser.Email.length == 0){
      this.errorTextReg = "All fields except document are required";
      return false;		
      }
    else
    {
      if(this.regUser.Name.length < 2)
      {
        this.errorTextReg = "Name must have minimum 2 characters";
        return false;
      }
      if(this.regUser.Surname.length < 2)
      {
        this.errorTextReg = "Surname must have minimum 2 characters";
        return false;
      }
      if(!this.regUser.Email.includes('@'))
      {
        this.errorTextReg = "Invalid email";
        return false;
      }
      this.errorTextReg = "";
    }
      console.log(`Dobili smo: `, JSON.stringify(this.regUser));
      return false; 
  }

}
