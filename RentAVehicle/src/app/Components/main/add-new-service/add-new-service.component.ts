import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Model/service';
import { ServiceManager} from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service'

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.css']
})
export class AddNewServiceComponent implements OnInit {

  service : Service;
  errorText : string;
  selectedFile: File; 

  constructor(private serviceManager: ServiceManager, private authService: AuthService) { 
    this.errorText = '';
    this.service = new Service(0,'', '','','',this.authService.currentUserId(),'',false,0);
  }

  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  changeData()
  {
    if(this.service.Name.length == 0 || this.service.Description.length == 0 || this.service.Email.length == 0 || this.service.Contact.length == 0)
    {
      this.errorText = "All fields except logo are requiered";
      return false;
    }
    else
    {
          this.errorText = "";
          this.serviceManager.addNewService(this.service,this.authService.currentUserId(),this.authService.currentUserToken()).subscribe(

            (res : any) => {

              if(this.selectedFile != undefined)
              {
                this.serviceManager.uploadServicePicture(this.authService.currentUserId(),this.selectedFile,this.authService.currentUserToken()).subscribe
                (
                      (res : any) => {
                              //alert(res._body);
                              
                      },
                      error =>
                      {
                              alert(error.json().Message);
                              return false;
                      }
                )
              }
              
            alert("Successful added new service");  
    
      },
      error =>
      {
              alert(error.json().Message);
              return false;
      }


  )




    }

  }



}
