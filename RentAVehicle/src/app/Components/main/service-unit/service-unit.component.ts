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
  ocena : number;

  constructor() { 
  }

  ngOnInit() {
    this.ocena = -1;
    if(this.service.AverageMark >= 0 && this.service.AverageMark <= 0.5)
    {
      this.ocena = 0;
    }
    else if(this.service.AverageMark >= 0.5 && this.service.AverageMark < 1.5)
    {
      this.ocena = 1;
    }
    else if(this.service.AverageMark >= 1.5 && this.service.AverageMark < 2.5)
    {
      this.ocena = 2;
    }
    else if(this.service.AverageMark >= 2.5 && this.service.AverageMark < 3.5)
    {
      this.ocena = 3;
    }
    else if(this.service.AverageMark >= 3.5 && this.service.AverageMark < 4.5)
    {
      this.ocena = 4;
    }
    else if(this.service.AverageMark >= 4.5 && this.service.AverageMark <= 5)
    {
      this.ocena = 5;
    }
  }

}
