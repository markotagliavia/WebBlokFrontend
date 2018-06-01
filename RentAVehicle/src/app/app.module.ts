import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/core/header/header.component';
import { LoginFormComponent } from './Components/login/login-form/login-form.component';
import { RegistrationFormComponent } from './Components/registration/registration-form/registration-form.component';
import { FooterComponent } from './Components/core/footer/footer.component';
import { WelcomeScreenComponent } from './Components/main/welcome-screen/welcome-screen.component';
import { CentralPartComponent } from './Components/main/central-part/central-part.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FooterComponent,
    WelcomeScreenComponent,
    CentralPartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
