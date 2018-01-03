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
  datepicker: Date;
  dayStr:string;
  yearString:string;
  monthStr:string;
  traveldate = Date;
  travelmonth=Date;
  travelyear=Date;
  minDate: Date;
  maxDate: Date;
  
  //maxDate = new Date().setMonth(this.minDate.getMonth()+1);

  

  constructor(private cookieSevice:CookieService,private http:Http,private router:Router,private datepipe:DatePipe) { 

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()-30);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }
  

  searchbus(source,destination,tickets,date){

    //console.log("date string"+this.day,this.month+1,this.year);
    console.log(source,destination,tickets,date);
    //console.log("date "+date._i.date+"-"+(date._i.month+1)+"-"+date._i.year);
    //this.dateStr=date._i.year+"-"+(date._i.month+1)+"-"+date._i.date;
    //console.log(this.dateStr);
    //this.dateconvert(datepickerModel);
    this.cookieSevice.put('source',source);
    this.cookieSevice.put('destination',destination);
    this.cookieSevice.put('tickets',tickets);
//this.traveldate=date.getDate();
this.dateconvert(date);
//console.log("travel date is "+this.traveldate+date.getMonth()+1,date.getFullYear());
    //this.cookieSevice.put('date',this.dateStr);
    //this.router.navigate(['/searchbus']);
  }
  dateconvert(dateinitial){
    console.log(dateinitial);
    //console.log("travel date is "+this.traveldate+dateinitial.getMonth()+1,dateinitial.getFullYear());
    this.monthStr=("0" + (dateinitial.getMonth() + 1)).slice(-2);
    this.dayStr=dateinitial.getDate();
    this.yearString=dateinitial.getFullYear();
    //console.log("after conversion "+("0" + (dateinitial.getMonth() + 1)).slice(-2),this.monthStr);
    //console.log("travel date is "+this.dayStr+"-"+this.monthStr+"-"+this.yearString);
    this.dateStr=this.yearString+"-"+this.monthStr+"-"+this.dayStr;
    this.cookieSevice.put('date',this.dateStr);
console.log(this.dateStr);
    this.router.navigate(['/searchbus']);

  }

  ngOnInit() {
  }

}
