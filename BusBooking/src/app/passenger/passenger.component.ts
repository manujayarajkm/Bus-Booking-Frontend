import { Component, OnInit,OnDestroy } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  id: number;
  private sub: any;
  no:number[]=[];

  constructor(private cookieSevice:CookieService,private http:Http,private router:Router,private route:ActivatedRoute,private fb: FormBuilder) { }

  userinfo(name,age,gender,address,idproof){
    console.log(name,age,gender,address,idproof);
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