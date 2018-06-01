import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/core/header/header.component';
import { LoginFormComponent } from './Components/login/login-form/login-form.component';
import { RegistrationFormComponent } from './Components/registration/registration-form/registration-form.component';
import { FooterComponent } from './Components/core/footer/footer.component';
import { WelcomeScreenComponent } from './Components/main/welcome-screen/welcome-screen.component';
import { CentralPartComponent } from './Components/main/central-part/central-part.component';
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
import { EditCarTypeComponent } from './Components/main/edit-car-type/edit-car-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FooterComponent,
    WelcomeScreenComponent,
    CentralPartComponent,
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
    EditCarTypeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
