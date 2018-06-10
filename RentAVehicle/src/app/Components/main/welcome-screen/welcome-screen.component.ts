  import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
  import { AuthService } from '../../../Services/auth.service';

  @Injectable()
  @Component({
    selector: 'app-welcome-screen',
    templateUrl: './welcome-screen.component.html',
    styleUrls: ['./welcome-screen.component.css']
  })
  export class WelcomeScreenComponent implements OnInit {

    client : boolean;
    manager : boolean;
    admin : boolean;
    parentMessage : string;
    @Output() messageEvent = new EventEmitter<string>();

    constructor(private authService: AuthService) {
      this.client = false;
      this.manager = false;
      this.admin = false;
      this.parentMessage = 'empty';
    }

    ngOnInit() {
      this.refreshUI();
    }

    refreshUI()
    {
      this.client = false;
      this.manager = false;
      this.admin = false;
      if(this.authService.currentUserName() != undefined)
      {
          if(this.authService.currentUserName().length > 0)
          {
              if(this.authService.isLoggedInRole('Admin'))
              {
                this.admin = true;
                this.client = true;
              }
              else if(this.authService.isLoggedInRole('Manager'))
              {
                this.manager = true;
                this.client = true;
              }
              else if(this.authService.isLoggedInRole('AppUser'))
              {
                this.client = true;
              }
          }
      }

    }

    receiveMessage($event) {
      //treba i ovde
      this.refreshUI();
      this.parentMessage = 'ok';
    }

    receiveRefresh($event) {
      //treba i ovde
      this.refreshUI();
    
    }
    
    
    

  }
