import { Routes } from '@angular/router';

import { WelcomeScreenComponent } from '../Components/main/welcome-screen/welcome-screen.component';
import { WelcomeScreenRegComponent } from '../Components/main/welcome-screen-reg/welcome-screen-reg.component';
import { CarsMainComponent } from '../Components/main/cars-main/cars-main.component';
import { ServicesMainComponent } from '../Components/main/services-main/services-main.component';
import { TeamMainComponent } from '../Components/main/team-main/team-main.component';
import { AccountMainComponent } from '../Components/main/account-main/account-main.component';
import { AdminPanelMainComponent } from '../Components/main/admin-panel-main/admin-panel-main.component';
import { AddNewServiceComponent } from '../Components/main/add-new-service/add-new-service.component';
import { AddNewCarComponent } from '../Components/main/add-new-car/add-new-car.component';
import { AddNewCarTypeComponent } from '../Components/main/add-new-car-type/add-new-car-type.component';
import { ReservationComponent } from '../Components/main/reservation/reservation.component';
import { ServiceSingleComponent } from '../Components/main/service-single/service-single.component';
import { EditCarComponent } from '../Components/main/edit-car/edit-car.component';
import { EditServiceComponent } from '../Components/main/edit-service/edit-service.component';

export const routes :Routes = [
	{path: 'home/login', component: WelcomeScreenComponent},
	{path: 'home/registration', component: WelcomeScreenRegComponent},
	{path: 'cars', component: CarsMainComponent},
	{path: 'services', component: ServicesMainComponent},
	{path: 'team', component: TeamMainComponent},
	{path: 'account', component: AccountMainComponent},
	{path: 'panel', component: AdminPanelMainComponent},
	{path: 'services/new', component: AddNewServiceComponent},
	{path: 'services/edit/:id', component: EditServiceComponent},
	{path: 'serviceSingle/:id', component: ServiceSingleComponent},
	{path: 'cars/new/:id', component: AddNewCarComponent},
	{path: 'cars/edit/:id', component: EditCarComponent},
	{path: 'types', component: AddNewCarTypeComponent},
	{path: 'reservation/:id', component: ReservationComponent},
	{path: '', redirectTo: '/home/login', pathMatch: 'full'}
];
