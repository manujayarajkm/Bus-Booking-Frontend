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
  user:User[];
  checkvar:number;
  

  constructor(private cookieSevice:CookieService,private http:Http,private router:Router,private datepipe:DatePipe) { 

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }
  

  searchbus(source,destination,tickets,date){

    console.log(source,destination,tickets,date);
    this.cookieSevice.put('source',source);
    this.cookieSevice.put('destination',destination);
    this.cookieSevice.put('tickets',tickets);
    this.cookieSevice.put('userid','0000');

this.dateconvert(date);

  }
  dateconvert(dateinitial){
    console.log(dateinitial);
    this.monthStr=("0" + (dateinitial.getMonth() + 1)).slice(-2);
    this.dayStr=("0" + (dateinitial.getDate())).slice(-2);
    this.yearString=dateinitial.getFullYear();
    
    this.dateStr=this.yearString+"-"+this.monthStr+"-"+this.dayStr;
    this.cookieSevice.put('date',this.dateStr);
console.log('travel date '+this.dateStr);
    this.router.navigate(['/searchbus']);

  }

  login(username,password){

    console.log(username,password);
    let userObj={
      "username":username,
      "password":password
    }

    this.http.post('http://localhost:8080/buscontroller/login',userObj)
    .subscribe(

      (res:Response)=>{
        const userinfo=res.json();
        console.log(userinfo);
        if(userinfo.userid==0){
          alert('Wrong username/password');
        }
        else{
          this.cookieSevice.put('userid',userinfo.userid.toString());
          this.checkvar=userinfo.userid;
          //location.reload();
        }
         
        console.log('userid '+this.cookieSevice.get('userid'));

      }
    )

  }

  ngOnInit() {
  }

}

interface User{
  userid: number,
    name: string,
    email: string,
    userPhone: number,
    username: string,
    gender: string,
    age: number
}
