import { Component, OnInit, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class BranchControlComponent implements OnChanges {

  @Input() service : Service; 
  branches: Branch[];
	errorText : string;
	branchNameInput : string;
  branchNameSelected : string;
  branch : Branch;
  selectedFile: File; 
  
  constructor(public serviceManager: ServiceManager,private authService: AuthService) {
    this.errorText = "";
    //this.branchNameInput = "";
    this.branchNameSelected = "";
    this.branch = {
      'Id' : -1,
      'Name':'',
      'Address' : '',
      'Longitude': -1,
      'Latitude' : -1,
      'ServiceId' : -1,
    };
    this.branches = []; //to do uraditi zahtev za dobijanje...
    
    
    }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['service'])
    {
      if(this.service != undefined)
      {
        this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
          (res: any) => {
                   
                  for(let i=0; i<res.length; i++){
                   if(this.service.Id == res[i].ServiceId) 
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
      
    }
    
  }

  newBranch()
  {
    //to do slika jos

	  if(this.branch.Name.length == 0 || this.branch.Address.length == 0)
	  {
		  this.errorText = "You must enter branch name and address";
		  return false;
	  }
	  else
	  {
		  this.errorText = "";
	  }
    
    this.branch = new Branch(0,this.branch.Name,this.branch.Address,this.branch.Latitude, this.branch.Longitude,this.service.Id);

    this.serviceManager.createBranch(this.branch,this.authService.currentUserToken()).subscribe(
			(res: any) => {

        //alert(res.json().Id);
        if(this.selectedFile != undefined)
        {
          this.serviceManager.uploadBranchPicture(res.json().Id,this.selectedFile,this.authService.currentUserToken()).subscribe
          (
            (res : any) => {
              this.branches = [];
              this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
              (res: any) => {
                      
                      for(let i=0; i<res.length; i++){
                      if(this.service.Id == res[i].ServiceId) 
                      {
                        this.branches.push(res[i]); //use i instead of 0
                      }
                    }     
              },
              error =>{
                console.log(error);
              }
          
        )
            },
            error =>
            {

            }
          )
        }
        this.branch = {
          'Id' : -1,
          'Name':'',
          'Address' : '',
          'Longitude': -1,
          'Latitude' : -1,
          'ServiceId' : -1,
        };
        alert("Successfully added new branch " + this.branch.Name);
        this.branches = [];
        this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
          (res: any) => {
                  
                  for(let i=0; i<res.length; i++){
                  if(this.service.Id == res[i].ServiceId) 
                  {
                    this.branches.push(res[i]); //use i instead of 0
                  }
                }     
          },
          error =>{
            console.log(error);
          }
          
        )
	
				},
			error => {
		
				alert(error.json().Message);

				this.errorText = error.json().Message;
			}
    )
    

    this.branchNameInput = '';
    return false;
  }
  
  updateBranch()
  {
    //slika jos

    if(this.branch.Name.length == 0 || this.branchNameSelected.length == 0 || this.branch.Address.length == 0 ){
      this.errorText = "All fields are required";
      return false;		
      }
      else
      {
        this.errorText = "";
      }
      

      for(let i=0; i<this.branches.length; i++){
        
        if(this.branches[i].Name == this.branchNameSelected )
        {
        
          this.serviceManager.putBranch(this.branches[i],this.branch,this.authService.currentUserToken()).subscribe(

            (res: any) => {
              this.branch = {
                'Id' : -1,
                'Name':'',
                'Address' : '',
                'Longitude': -1,
                'Latitude' : -1,
                'ServiceId' : -1,
              };
                   
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

              this.branch = {
                'Id' : -1,
                'Name':'',
                'Address' : '',
                'Longitude': -1,
                'Latitude' : -1,
                'ServiceId' : -1,
              };
                   
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  changeDataInForm()
  {
    //na selekciju popuniti podatke o postojecoj filijali u poljima
    for(let i=0; i<this.branches.length; i++){
        
      if(this.branches[i].Name == this.branchNameSelected )
      {
        this.branch = this.branches[i];
      }
    }
    
  }

}
