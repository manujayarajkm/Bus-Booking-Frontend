import { Component, OnInit,TemplateRef } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'

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
  s:Seat[];
  routeId:number;
  modalRef: BsModalRef;
  amount:number;

selected:number[]=[];
  constructor(private cookieSevice:CookieService,private http:Http,private router:Router,private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>,busId,routeId,busType,cost) {
    this.modalRef = this.modalService.show(template);
    this.getDestValue(busId,routeId,busType,cost);
  }
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
       this.s=res.json();
      console.log(this.s);
       
      
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
  }

  getDestValue(busId,routeId,busType,cost){

    
    this.http.get('http://localhost:8080/buscontroller/getDestValue'+'/'+this.source+'/'+routeId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
         
        this.cookieSevice.put('busId',busId);
        this.cookieSevice.put('bustype',busType);
        this.cookieSevice.put('routeid',routeId);
        this.cookieSevice.put('cost',cost);

        console.log('bus id is '+this.cookieSevice.get('busId'),this.cookieSevice.get('bustype'),this.cookieSevice.get('routeid'),this.cookieSevice.get('cost'));
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
    for(let s of this.s){
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
    
    for(let s of this.s){
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
    const lengt=this.selected.length;
    this.cookieSevice.put('arraylen',lengt.toString());
  this.amount=+this.cookieSevice.get('cost')*lengt;
    let seatObj={
      "routeId":this.cookieSevice.get('routeid'),
      "userId":this.cookieSevice.get('userid'),
      "busId":this.cookieSevice.get('busId'),
      "seats":this.selected,
      "source":this.cookieSevice.get('source'),
      "destination":this.cookieSevice.get('destination'),
      "busType":this.cookieSevice.get('bustype'),
      "amount":this.amount,
      "bookingDate":this.cookieSevice.get('date'),
      "noOfSeats":this.selected.length
      

    }

    this.http.post('http://localhost:8080/buscontroller/bookseats',seatObj)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
         
      this.cookieSevice.put('bookingid',message);
      console.log('booking id cookie'+this.cookieSevice.get('bookingid'));
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
    this.router.navigate(['passenger']);
    location.reload();
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
