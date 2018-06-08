import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../../Model/service';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit, OnDestroy {

  service : Service;
  errorText : string;
  selectedFile: File; 
  serviceId : number;
  private sub : any;
  

  constructor(private route: ActivatedRoute,private serviceManager : ServiceManager, private authService : AuthService) { 
    this.errorText = '';
    this.service = new Service(0,'', '','','',-1,'',false,0);
    this.sub = this.route.params.subscribe(params => {
      this.serviceId = +params['id']; // (+) converts string 'id' to a number
   }); 

   this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
    (res: any) => {
             this.service = res;
          },
    error =>{
       console.log(error);
    });
   
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
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
    
    this.serviceManager.putService(this.service, this.authService.currentUserToken()).subscribe
    (
      (res:any) =>
      {
        if(this.selectedFile != undefined)
        {
          this.serviceManager.uploadServicePicture(this.service.Id,this.selectedFile,this.authService.currentUserToken()).subscribe
          (
                (res : any) => {
                        //alert(res._body); 
                        this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
                          (res: any) => {
                                   this.service = res;
                                },
                          error =>{
                             console.log(error);
                          });   
                                    
                },
                error =>
                {
                        alert(error.json().Message);
                        //return false;
                }
          )
        }
              alert("Successfully changed service");
              this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
                (res: any) => {
                         this.service = res;
                      },
                error =>{
                   console.log(error);
                }); 
              
      },
      error =>
      {
              alert(error.json().Message);
              this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
                (res: any) => {
                         this.service = res;
                      },
                error =>{
                   console.log(error);
                }); 
      }

      
      
    )

                 

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
