import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }
  public formdata:any
  //to send the search key
  public msg = new BehaviorSubject(null)
  public currentmsg = this.msg.asObservable()

  getData(){
    return this.currentmsg
  }
  sendData(d:any){
    return this.msg.next(d)
  }
  //to set the values of form
  setForm(data:any){
    this.formdata=data
  }
  getForm(){
    return this.formdata
  }
  //to save and get the data to and from local storage
  saveperson(person:any[]){
    localStorage.setItem('person',JSON.stringify(person))
  }
  getPerson(){
    const perData=localStorage.getItem('person')
    if(perData){
      return JSON.parse(perData)
    }
    return []
  }
}
