import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reservation } from '../../../Model/reservation';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit, OnDestroy {

  reservationId : number;
  reservation : Reservation;
  private sub : any;

  constructor(private route: ActivatedRoute,private serviceManager : ServiceManager, private authService : AuthService) {
    this.reservation = new Reservation(0,false, '','',-1,-1,-1,[]);
    this.sub = this.route.params.subscribe(params => {
      this.reservationId = +params['id']; // (+) converts string 'id' to a number
   }); 

   // to do zahtev za rezervaciju po Id
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editRes()
  {
    // to do 
  }

}
