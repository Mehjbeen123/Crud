import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  public con : string[]=['India','United States','England','Shrilanka','Pakistan','Saudi']
  public myform:any
  public isSubmit:any
  public formData:any
  public updateData:any
  public oldArr:any=[]
  public avatarUrl:any
  public isupdate:boolean=false
  constructor(private fb: FormBuilder,private p:PersonService,private router: Router){
    this.myform=this.fb.group({
      id:[''],
      fname:['',Validators.required],
      lname:['',Validators.required],
      email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      avatar:['',Validators.required],
      dob:['',Validators.required],
      con:['',Validators.required]
    })

  }
  //to update the data and to reload the local storage data
  ngOnInit(){
    const localdata=this.p.getPerson()
    this.oldArr=localdata
    this. updateData = this.p.getForm()
    if(this.updateData){
      this.myform.patchValue(this.updateData)
      this.isupdate = true
    }
  }
 //for selecting image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
        this.myform.get('avatar').setValue(this.avatarUrl)
      
      };
      reader.readAsDataURL(file);
    }
  }
  //to submit the form
  onSumbit(){
    this.isSubmit=true
    if(this.myform.valid){
      const islocal=this.p.getPerson()
      if(islocal!=null){
        this.myform.value.id=this.oldArr.length+1
        this.oldArr.push(this.myform.value)
        this.formData=this.oldArr
        this.p.saveperson(this.oldArr)
      }else{
        const newArr=[]
        console.log(this.myform.value)
        newArr.push(this.myform.value)
        this.myform.value.id = 1
        this.formData=newArr
        this.p.saveperson(newArr)
      }
        this.isSubmit=false
        this.myform.reset()
    }
  
    
  }
  //to update the data
  onEdit(){
    this.isupdate=true
    const update = this.p.getPerson()
    
    update.forEach((e:any,i:any)=>{
      if(e.id===this.myform.value.id){
        update.splice(i,1,this.myform.value)
        this.p.saveperson(update)
        this.router.navigateByUrl('/list')
      }
    })
  }
}