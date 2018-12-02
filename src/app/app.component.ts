import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang2php';
  pressmessage ="";
  nameFormControl = new FormControl('', Validators.required);

  constructor() {
    console.log("This is constructor");
  }

  ngOnInit(){
    console.log("This is on ng init");
  }

 gotophp(){
   //only pass to java if value is present
if(! this.nameFormControl.hasError('required')){
    console.log("Go to php");
    this.pressmessage="Going to fetch data from java";
  }else{
    this.nameFormControl.markAsTouched();

  }
  }
}
