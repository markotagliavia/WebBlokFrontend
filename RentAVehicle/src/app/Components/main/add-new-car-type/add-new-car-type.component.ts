import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-car-type',
  templateUrl: './add-new-car-type.component.html',
  styleUrls: ['./add-new-car-type.component.css']
})
export class AddNewCarTypeComponent implements OnInit {

	errorText : string;
	typeNameInput : string;
	typeNameSelected : string;

  constructor() {
	this.errorText = "";
	this.typeNameInput = "";
	this.typeNameSelected = "";
  }

  ngOnInit() {
  }

  newType()
  {
	  if(this.typeNameInput.length == 0)
	  {
		  this.errorText = "You must enter type name";
		  return false;
	  }
	  else
	  {
		  this.errorText = "";
	  }
	  
  }
  
  updateType()
  {
	  
  }
  
  deleteType()
  {
	  
  }
  
}
