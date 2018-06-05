import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../Model/reservation';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  errorText : string;
  reservation : Reservation;

  constructor() { 
    this.errorText = "";
    this.reservation = {
      'filijalaIn' : '',
      'filijalaOut' : '',
      'serviceName' : '',
      'vremeIn' : '',
      'vremeOut' : '',
      'adresaIn' : '',
      'adresaOut' : '',
       'ukupnaCena' : ''
    }
  }

  ngOnInit() {
  }

  submitRes()
  {
    if(this.reservation.serviceName.length == 0 || this.reservation.filijalaIn.length == 0 || this.reservation.filijalaOut.length == 0
      || this.reservation.vremeIn.length == 0 || this.reservation.vremeOut.length == 0)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      this.errorText = "";
    }
  }

}
