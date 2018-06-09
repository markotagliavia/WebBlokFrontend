import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Rate } from '../../../../Model/rate';

@Injectable()
@Component({
  selector: 'app-rate-unit',
  templateUrl: './rate-unit.component.html',
  styleUrls: ['./rate-unit.component.css']
})
export class RateUnitComponent implements OnInit {

  @Input() rate : Rate;
  smeDaIzmeni : boolean;

  constructor() { 
    this.smeDaIzmeni = false;

  }

  ngOnInit() {
    
    //user na sesiji pa uporedi je l sme na osnovu toga da klikce
  }

  edit()
  {
    // to do
  }

  delete()
  {
    //to do
  }

}
