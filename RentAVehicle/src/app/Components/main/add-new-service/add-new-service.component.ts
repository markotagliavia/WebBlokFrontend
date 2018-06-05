import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Model/service';

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.css']
})
export class AddNewServiceComponent implements OnInit {

  service : Service;
  errorText : string;

  constructor() { 
    this.errorText = '';
    this.service = {
      'name' : '',
      'desc' : '',
      'email' : '',
      'contact' : ''
    }
  }

  ngOnInit() {
  }

  changeData()
  {
    if(this.service.name.length == 0 || this.service.desc.length == 0 || this.service.email.length == 0 || this.service.contact.length == 0)
    {
      this.errorText = "All fields except logo are requiered";
      return false;
    }
    else
    {
      this.errorText = "";
    }

  }

}
