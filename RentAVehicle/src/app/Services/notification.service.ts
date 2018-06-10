// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from "../Services/auth.service";
import { Http } from '@angular/http';

// declare the global variables
declare var $: any;

@Injectable()
export class NotificationService {
    // Declare the variables  
    private proxy: any;
    private proxyName: string = 'notifications';
    private connection: any;

    // create the Event Emitter  
    public notificationReceived: EventEmitter<string>;   // *
    public connectionEstablished: EventEmitter<Boolean>;
    public timeReceived: EventEmitter<string>;
    public connectionExists: Boolean;
    public authService: AuthService;



    constructor(private http:Http) {



        // Constructor initialization  
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.notificationReceived = new EventEmitter<string>();  //*
        this.timeReceived = new EventEmitter<string>();
        this.connectionExists = false;
        this.authService = new AuthService(this.http);

        // create hub connection  

        this.connection = $.hubConnection("http://localhost:51432/");
        // this.connection.qs = { 'Authorization' : this.authService.currentUserToken() };
        // create new proxy as name already given in top  

        this.proxy = this.connection.createHubProxy(this.proxyName);
         // call the connecion start method to start the connection to send and receive events. 
        this.startConnection();
        
        // register on server events  
        this.registerOnServerEvents();
    }
    // method to hit from client  
    public sendHello() {
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');
    }
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {
        this.connection.start().done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;

        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
    private registerOnServerEvents(): void {
        console.log("regostered fpr serverNotif");
        this.proxy.on('clickNotification', (data: string) => {      //*
            console.log('received notification: ' + data);
            this.notificationReceived.emit(data);
        });
    }

    public GetNotification() {
        console.log("GetNotification service");
        if (this.authService.isLoggedInRole("Admin")) {
            this.proxy.invoke("GetNotification");
        }

    }

    public RegisterForNotifications() {
        let userId: number = this.authService.currentUserId();
        let userRole: string = this.authService.currentUserRole();
        console.log("registered fpr notif ", userRole);
        this.proxy.invoke("RegisterForNotification", userId, userRole);
    }

    public UnsubscribeForNotifications() {
        let userId: number = this.authService.currentUserId();
        let userRole: string = this.authService.currentUserRole();
        this.proxy.invoke("UnsubscribeForNotifications", userId, userRole);
    }


}  