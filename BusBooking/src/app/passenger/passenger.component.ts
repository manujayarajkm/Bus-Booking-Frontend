import { Component, OnInit,OnDestroy } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';


@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  id: number;
  private sub: any;
  no:number[]=[];
  len:number;

  constructor(private cookieSevice:CookieService,private http:Http,private router:Router) { }

  userinfo(name,age,gender,address,idproof){
    console.log(name,age,gender,address,idproof);
  this.len=+this.cookieSevice.get('arraylen');
  console.log(this.cookieSevice.get('bookingid'));
    let passengerObj={
      "passengerName":name,
      "passengerGender":gender,
      "passengerAge":age,
      "bookingId":+this.cookieSevice.get('bookingid')
      

    }

    this.http.post('http://localhost:8080/buscontroller/addpassenger',passengerObj)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
         
      alert("success");
      this.router.navigate(['']);
        

      }
    )

  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //    this.id = params['lengt']; 
    //   console.log(this.id);
    // });
    this.id=+this.cookieSevice.get('tickets');
    this.id--;
    this.no = Array(this.id).fill(0).map((x,i)=>i);
  console.log(this.id);
  console.log(this.no);
  }
  // passenger(name){
  //   console.log(name);
  // }

 
}