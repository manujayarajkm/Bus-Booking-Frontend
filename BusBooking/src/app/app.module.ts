import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes,ActivatedRoute} from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {DatePipe} from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import{DatePickerModule} from 'angular-io-datepicker';
import { ModalModule } from 'ngx-bootstrap';





import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LaunchComponent } from './launch/launch.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { PassengerComponent } from './passenger/passenger.component';

const AppRoutes:Routes=[
  {path:'',component:LaunchComponent},
  {path:'searchbus',component:BusListComponent},
  {path:'passenger',component:PassengerComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LaunchComponent,
    BusListComponent,
    PassengerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    CarouselModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgDatepickerModule,
    DatePickerModule,
    ModalModule.forRoot()
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
