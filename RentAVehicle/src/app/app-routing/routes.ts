import { Routes } from '@angular/router';

import { WelcomeScreenComponent } from '../Components/main/welcome-screen/welcome-screen.component';
import { WelcomeScreenRegComponent } from '../Components/main/welcome-screen-reg/welcome-screen-reg.component';
import { CarsMainComponent } from '../Components/main/cars-main/cars-main.component';
import { ServicesMainComponent } from '../Components/main/services-main/services-main.component';
import { TeamMainComponent } from '../Components/main/team-main/team-main.component';
import { AccountMainComponent } from '../Components/main/account-main/account-main.component';
import { AdminPanelMainComponent } from '../Components/main/admin-panel-main/admin-panel-main.component';
import { ManagerPanelMainComponent } from '../Components/main/manager-panel-main/manager-panel-main.component';
import { AddNewServiceComponent } from '../Components/main/add-new-service/add-new-service.component';
import { AddNewCarComponent } from '../Components/main/add-new-car/add-new-car.component';
import { AddNewCarTypeComponent } from '../Components/main/add-new-car-type/add-new-car-type.component';
import { ReservationComponent } from '../Components/main/reservation/reservation.component';
import { ServiceSingleComponent } from '../Components/main/service-single/service-single.component';
import { EditCarComponent } from '../Components/main/edit-car/edit-car.component';
import { EditServiceComponent } from '../Components/main/edit-service/edit-service.component';
import { EditReservationComponent } from '../Components/main/edit-reservation/edit-reservation.component';

import { AccountGuard } from '../Components/main/account-main/account-guard';
import { AdminPanelGuard } from '../Components/main/admin-panel-main/admin-panel-guard';
import { AddCarGuard } from '../Components/main/add-new-car/add-new-car-guard';
import { AddServiceGuard } from '../Components/main/add-new-service/add-new-service-guard';
import { EditCarGuard } from '../Components/main/edit-car/edit-car-guard';
import { EditServiceGuard } from '../Components/main/edit-service/edit-service-guard';
import { ReservationGuard } from '../Components/main/reservation/reservation-guard';
import { EditReservationGuard } from '../Components/main/edit-reservation/edit-reservation-guard';
import { ManagerPanelGuard } from '../Components/main/manager-panel-main/manager-panel-guard';

export const routes :Routes = [
	{path: 'home/login', component: WelcomeScreenComponent},
	{path: 'home/registration', component: WelcomeScreenRegComponent},
	{path: 'cars', component: CarsMainComponent},
	{path: 'services', component: ServicesMainComponent},
	{path: 'team', component: TeamMainComponent},
	{path: 'account', component: AccountMainComponent, canActivate: [AccountGuard]},
	{path: 'panel', component: AdminPanelMainComponent, canActivate : [AdminPanelGuard]},
	{path: 'services/new', component: AddNewServiceComponent, canActivate : [AddServiceGuard]},
	{path: 'services/edit/:id', component: EditServiceComponent, canActivate : [EditCarGuard]},
	{path: 'serviceSingle/:id', component: ServiceSingleComponent},
	{path: 'cars/new/:id', component: AddNewCarComponent, canActivate : [AddCarGuard]},
	{path: 'cars/edit/:id', component: EditCarComponent, canActivate : [EditServiceGuard]},
	{path: 'types', component: AddNewCarTypeComponent},
	{path: 'reservation/:id', component: ReservationComponent, canActivate : [ReservationGuard]},
	{path: 'editReservation/:id', component: EditReservationComponent, canActivate : [EditReservationGuard]},
	{path: 'managerPanel', component: ManagerPanelMainComponent, canActivate : [ManagerPanelGuard]},
	{path: '', redirectTo: '/home/login', pathMatch: 'full'}
];
