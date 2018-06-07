import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ServiceManager } from '../../../../Services/[services].service';
import { AuthService } from '../../../../Services/auth.service'; 
import { Branch } from '../../../../Model/branch'; 
import { Service } from '../../../../Model/service';

@Injectable()
@Component({
  selector: 'app-branch-control',
  templateUrl: './branch-control.component.html',
  styleUrls: ['./branch-control.component.css']
})
export class BranchControlComponent implements OnInit {

  @Input() service : Service;
  branches: Branch[];
	errorText : string;
	branchNameInput : string;
  branchNameSelected : string;
  branch : Branch;
  
  constructor(public serviceManager: ServiceManager,private authService: AuthService) {
    this.errorText = "";
    this.branchNameInput = "";
    this.branchNameSelected = "";
    this.branches = []; //to do uraditi zahtev za dobijanje...
    this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
               if(this.service.Id == res[i].serviceId) 
               {
                 this.branches.push(res[i]); //use i instead of 0
               }
            }     
      },
      error =>{
        console.log(error);
      }
      
    )
    
    }

  ngOnInit() {
  }

  newBranch()
  {
	  if(this.branchNameInput.length == 0)
	  {
		  this.errorText = "You must enter branch name";
		  return false;
	  }
	  else
	  {
		  this.errorText = "";
	  }
    
    this.branch = new Branch(0,this.branchNameInput,this.branch.Address,this.branch.Latitude, this.branch.Longitude,this.service.Id);

    this.serviceManager.createBranch(this.branch,this.authService.currentUserToken()).subscribe(
			(res: any) => {


				alert("Successfully added new branch " + this.branchNameInput);
	
				},
			error => {
		
				alert(error.json().Message);

				this.errorText = error.json().Message;
			}
    )
    this.branches = [];
    this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.branches.push(res[i]); //use i instead of 0
            }     
      },
      error =>{
  
      }
      
    )

    this.branchNameInput = '';
    return false;
  }
  
  updateBranch()
  {
    if(this.branchNameInput.length == 0 || this.branchNameSelected.length == 0 ){
      this.errorText = "All fields are required";
      return false;		
      }

      for(let i=0; i<this.branches.length; i++){
        
        if(this.branches[i].Name == this.branchNameSelected )
        {
        
          this.serviceManager.putBranch(this.branches[i],this.branch,this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully modify branch');
              this.branches = [];
              this.branchNameInput = '';
              this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
                (res: any) => {
                        
                        for(let i=0; i<res.length; i++){
                          this.branches.push(res[i]); //use i instead of 0
                      }     
                },
                error =>{
                  alert(error.json().Message);
                })
                 
            },
            error =>{
                  alert(error.json().Message);
            }
    
    
          )

          break;
        }
        
      }     
      
      return false;
  }
  
  deleteBranch()
  {

    if(this.branchNameSelected.length == 0 ){
      this.errorText = "branch must be selected";
      return false;		
      }

      for(let i=0; i<this.branches.length; i++){
        
        if(this.branches[i].Name == this.branchNameSelected )
        {
          this.serviceManager.deleteBranch(this.branches[i],this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully deleted branch');
              this.branches = [];
              this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
                (res: any) => {
                        
                        for(let i=0; i<res.length; i++){
                          this.branches.push(res[i]); //use i instead of 0
                      }     
                },
                error =>{
                  alert(error.json().Message);
                })
                 
            },
            error =>{
                  alert(error.json().Message);
            }
    
    
          )

          break;
        }
        
      }     
      
      return false;
	  
  }

}
