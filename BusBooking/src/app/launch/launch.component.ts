import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import {CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';



@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true } }
  ]
})

export class LaunchComponent implements OnInit {

  dateStr:string;
  datepickerModel: Date;

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'DD-MM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale
  };

  constructor(private cookieSevice:CookieService,private http:Http,private router:Router,private datepipe:DatePipe) { }
  

  searchbus(source,destination,tickets,date){
    console.log(source,destination,tickets,date);
    //console.log("date "+date._i.date+"-"+(date._i.month+1)+"-"+date._i.year);
    this.dateStr=date._i.year+"-"+(date._i.month+1)+"-"+date._i.date;
    //console.log(this.dateStr);
    //this.dateconvert(datepickerModel);
    this.cookieSevice.put('source',source);
    this.cookieSevice.put('destination',destination);
    this.cookieSevice.put('tickets',tickets);
    this.cookieSevice.put('date',this.dateStr);
    this.router.navigate(['/searchbus']);
  }
  dateconvert(dateinitial){
    console.log('initial '+dateinitial);
this.dateStr=dateinitial;
console.log('string '+this.dateStr);
//console.log('string after conversion'+{{this.dateStr|slice:2:4}});


  }

  ngOnInit() {
  }

}
