import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/person.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  @Input() cardData:any
  public searchText:any
  constructor(private p:PersonService,private router:Router){

  }
  //get the data from local storage and get the search key
  ngOnInit(){
   console.log(this.cardData.fname)
   this.p.getPerson()
   this.p.getData().subscribe({
    next:(res:any)=>{
      this.searchText=res
    }
   })
   
  }
  //to delete the data
  ondelete(id:any){
    this.cardData.forEach((e:any,i:any)=>{
      if(e.id==id){
        this.cardData.splice(i,1)
        this.p.saveperson(this.cardData)
      }
    })
  }
  //to navigate to the form and patch the values
  onupdate(data:any){
    this.p.setForm(data)
    this.router.navigateByUrl('/add')
  }

}
