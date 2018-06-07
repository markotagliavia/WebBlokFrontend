import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Service } from '../../../Model/service';  

@Injectable()
@Component({
  selector: 'app-service-unit',
  templateUrl: './service-unit.component.html',
  styleUrls: ['./service-unit.component.css']
})
export class ServiceUnitComponent implements OnInit {

  @Input() service : Service;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
