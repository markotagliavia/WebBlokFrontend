import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from "../../../Services/notification.service";
import { HttpService } from "../../../Services/http-service.service";
import { AuthService } from "../../../Services/auth.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  admin: boolean;
  manager: boolean;
  isConnected: Boolean = false;
  notifications: any[] = []; // **
  time: string;
  Manager: any;
  ngZone: NgZone;

  constructor(private notifService: NotificationService,
    private httpService: HttpService, private authService: AuthService) {
    // this.isConnected = false;
    // this.notifications = [];

    this.ngZone = new NgZone({ enableLongStackTrace: false });
  }


  ngOnInit() {
    this.admin = this.authService.isLoggedInRole("Admin");
    this.manager = this.authService.isLoggedInRole("Manager");
    this.checkConnection();
    this.subscribeForNotifications();
   // this.GetNotification();
  }


  private checkConnection() {
    this.notifService.connectionEstablished.subscribe(e => {
      this.isConnected = e;
      if (e) {
        console.log("hello send");
        this.notifService.sendHello()
      }
    });
  }

  private subscribeForNotifications() {
    console.log("subscribed to notif");
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) { // * 
    //let Manager: any = {};
    // let Notification: any = {};
    console.log("on notif ", notif);
    this.ngZone.run(() => {
      console.log("notif received ", notif);
      this.notifications.push(notif);
      window.alert(notif);
    });
  }

  // public onClick() {
  //   if (this.isConnected) {
  //     this.http.click().subscribe(data => console.log(data));
  //   }
  // }
  public GetNotification() {
    console.log("GetNotification");
    this.notifService.GetNotification();
  }

}
