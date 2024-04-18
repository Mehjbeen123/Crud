import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public searchkey:any=""
  constructor(private p:PersonService,private router:Router){}
  
  search(e:any){
    this.searchkey=(e.target as HTMLInputElement).value
    // console.log(this.searchkey)
    this.p.sendData(this.searchkey)
  }
  onroute(){
    this.router.navigate(['/list'])
    
  }
  onadd(){
    this.router.navigate(['/add'])
  
  }
}
