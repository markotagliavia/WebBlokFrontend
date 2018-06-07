import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Model/service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  service : Service;
  errorText : string;

  constructor() { 
    this.errorText = '';
    this.service = new Service(0,'', '','','',-1,'',false,0)
  }

  ngOnInit() {
  }

  changeData()
  {
    if(this.service.Name.length == 0 || this.service.Description.length == 0 || this.service.
      Email.length == 0 || this.service.Contact.length == 0)
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
