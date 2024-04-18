import { Component } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {
  public personList=[]
  constructor(private p :PersonService){}

  ngOnInit(){
    this.personList=this.p.getPerson()
  }
}
