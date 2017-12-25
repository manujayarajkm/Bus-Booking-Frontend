import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  noSeats:number;
  dateStr:String;
  source:String;
  destination:String;
  bus:Bus[];
  len:number;
  seat:Seat[];
  routeId:number;

selected:number[]=[];
  constructor(private cookieSevice:CookieService,private http:Http,private router:Router) { }

  getBusses(){
    this.source=this.cookieSevice.get('source');
    this.destination=this.cookieSevice.get('destination');
    this.dateStr=this.cookieSevice.get('date');
    this.noSeats=+this.cookieSevice.get('tickets');    
    console.log('inside bus check '+this.source,this.destination,this.dateStr,this.noSeats);

    this.http.get('http://localhost:8080/buscontroller/getAvailableBussess'+'/'+this.source+'/'+this.destination)
    .subscribe(

      (res:Response)=>{
       this.bus=res.json();
      console.log(this.bus);
       this.len=this.bus.length;
      console.log(this.len);
      
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )

  }

  getSeatLayout(destValue,busId){
    this.http.get('http://localhost:8080/buscontroller/getSeatLayout'+'/'+busId+'/'+destValue+'/'+this.dateStr)
    .subscribe(

      (res:Response)=>{
       this.seat=res.json();
      console.log(this.seat);
       
      
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
  }

  getDestValue(busId,routeId){

    
    this.http.get('http://localhost:8080/buscontroller/getDestValue'+'/'+this.destination+'/'+routeId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
         
      this.getSeatLayout(message,busId);
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
  }

  toggleimage(seatNo,busid){

    console.log('seat '+seatNo,busid);
    for(let s of this.seat){
      if(s.busId==busid && s.seatNo==seatNo){
        if(s.seatStatus=='available'){
          s.seatStatus='selected';
          this.selected.push(s.seatNo);
          console.log(this.selected);
          
        }
        else{
          s.seatStatus='available';
          this.splicearray(s.seatNo);
          console.log(this.selected);

        }
        if(this.selected.length>this.noSeats){
          this.changeimage(this.selected[0],s.busId);
          this.splicearray(this.selected[0]);
          console.log('after removal '+this.selected);
  
        }
      }
      
    }
    
    
  }
  changeimage(seatNo,busid){
    
    for(let s of this.seat){
      if(s.busId==busid && s.seatNo==seatNo){
          s.seatStatus='available';
          
        
      }
    }
  }

  splicearray(key){
    var index = this.selected.indexOf(key, 0);
    if (index > -1) {
       this.selected.splice(index, 1);
    }
  }
  submit(){
    console.log('seats are '+this.selected);
    alert('selected seats are '+this.selected);
  }

  ngOnInit() {
    this.getBusses();
  }

}
interface Bus{
  busId: number,
  busName: string,
  busType: string,
  noOfSeats: number,
  startTime: number,
  contactNo: number,
  reachTime: number,
  cost: number,
  routeId: number
}
interface Seat{
        busId: number,
        busName:String,
        bus_start_time:number,
        reachTime: number,
        seatNo: number,
        seatStatus: String,
        busType: String,
        destValue: number
}
