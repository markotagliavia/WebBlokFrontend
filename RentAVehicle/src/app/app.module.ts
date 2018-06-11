import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module'
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/core/header/header.component';
import { LoginFormComponent } from './Components/login/login-form/login-form.component';
import { RegistrationFormComponent } from './Components/registration/registration-form/registration-form.component';
import { FooterComponent } from './Components/core/footer/footer.component';
import { WelcomeScreenComponent } from './Components/main/welcome-screen/welcome-screen.component';
import { NavbarComponent } from './Components/core/navbar/navbar.component';
import { ServicesMainComponent } from './Components/main/services-main/services-main.component';
import { ServiceUnitComponent } from './Components/main/service-unit/service-unit.component';
import { TeamMainComponent } from './Components/main/team-main/team-main.component';
import { CarsMainComponent } from './Components/main/cars-main/cars-main.component';
import { CarUnitComponent } from './Components/main/car-unit/car-unit.component';
import { AccountMainComponent } from './Components/main/account-main/account-main.component';
import { AdminPanelMainComponent } from './Components/main/admin-panel-main/admin-panel-main.component';
import { ManagerPanelMainComponent } from './Components/main/manager-panel-main/manager-panel-main.component';
import { MapComponent } from './Components/main/map/map.component';
import { ServiceSingleComponent } from './Components/main/service-single/service-single.component';
import { AddNewServiceComponent } from './Components/main/add-new-service/add-new-service.component';
import { AddNewCarComponent } from './Components/main/add-new-car/add-new-car.component';
import { ReservationComponent } from './Components/main/reservation/reservation.component';
import { AddNewCarTypeComponent } from './Components/main/add-new-car-type/add-new-car-type.component';
import { EditServiceComponent } from './Components/main/edit-service/edit-service.component';
import { EditCarComponent } from './Components/main/edit-car/edit-car.component';
import { WelcomeScreenRegComponent } from './Components/main/welcome-screen-reg/welcome-screen-reg.component';
import { HttpService } from './Services/http-service.service'; 
import { NotificationService } from './Services/notification.service'; 
import { AuthService } from "./Services/auth.service";
import { FormsModule } from '@angular/forms';
import { AdminPanelClientManagingComponent } from './Components/main/admin-panel-client-managing/admin-panel-client-managing.component';
import { AdminPanelServiceManagingComponent } from './Components/main/admin-panel-service-managing/admin-panel-service-managing.component';
import { TableRowUserComponent } from './Components/main/admin-panel-client-managing/table-row-user/table-row-user.component';
import { BranchControlComponent } from './Components/main/service-single/branch-control/branch-control.component';
import { RatesControlComponent } from './Components/main/service-single/rates-control/rates-control.component';
import { RateUnitComponent } from './Components/main/service-single/rate-unit/rate-unit.component';
import { EditReservationComponent } from './Components/main/edit-reservation/edit-reservation.component';
import { NotificationsComponent } from './Components/main/notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FooterComponent,
    WelcomeScreenComponent,
    NavbarComponent,
    ServicesMainComponent,
    ServiceUnitComponent,
    TeamMainComponent,
    CarsMainComponent,
    CarUnitComponent,
    AccountMainComponent,
    AdminPanelMainComponent,
    ManagerPanelMainComponent,
    MapComponent,
    ServiceSingleComponent,
    AddNewServiceComponent,
    AddNewCarComponent,
    ReservationComponent,
    AddNewCarTypeComponent,
    EditServiceComponent,
    EditCarComponent,
    WelcomeScreenRegComponent,
    AdminPanelClientManagingComponent,
    AdminPanelServiceManagingComponent,
    TableRowUserComponent,
    BranchControlComponent,
    RatesControlComponent,
    RateUnitComponent,
    EditReservationComponent,
    NotificationsComponent
	
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	HttpModule,
  FormsModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCbacKCVoG5Oplis1L0IOvOy5Dwm3i3ICU'
  })
  ],
  providers: [HttpService, AuthService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
