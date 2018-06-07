import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../Services/http-service.service';
import { AuthService } from '../../../../Services/auth.service'; 
import { Branch } from '../../../../Model/branch'; 

@Component({
  selector: 'app-branch-control',
  templateUrl: './branch-control.component.html',
  styleUrls: ['./branch-control.component.css']
})
export class BranchControlComponent implements OnInit {

  branches: Branch[];
	errorText : string;
	branchNameInput : string;
  branchNameSelected : string;
  branch : Branch;
  
  constructor(public httpService: HttpService,private authService: AuthService) {
    this.errorText = "";
    this.branchNameInput = "";
    this.branchNameSelected = "";
    this.branches = []; //to do uraditi zahtev za dobijanje...
    this.httpService.getBranches(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.branches.push(res[i]); //use i instead of 0
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
    
    this.branch = new Branch(this.branchNameInput,this.branch.Address,this.branch.Latitude, this.branch.Longitude);

    this.httpService.createBranch(this.branch,this.authService.currentUserToken()).subscribe(
			(res: any) => {


				alert("Successfully added new branch " + this.branchNameInput);
	
				},
			error => {
		
				alert(error.json().Message);

				this.errorText = error.json().Message;
			}
    )
    this.branches = [];
    this.httpService.getbBranch(this.authService.currentUserToken()).subscribe(
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
          this.httpService.putBranch(this.branches[i],this.branchNameInput,this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully modify branch');
              this.branches = [];
              this.branchNameInput = '';
              this.httpService.getBranch(this.authService.currentUserToken()).subscribe(
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
          this.httpService.deleteBranch(this.branches[i],this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully deleted branch');
              this.branches = [];
              this.httpService.getBranch(this.authService.currentUserToken()).subscribe(
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
