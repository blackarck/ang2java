import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {from} from 'rxjs';
//import 'rxjs/add/observable/fromPromise';


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

      // Create an Observable out of a promise
      const data = from(fetch('http://localhost:8080/lottoget'));
      // Subscribe to begin listening for async result
      data.subscribe({
        next(response) {

           console.log("returntxt " + response);
          //  this.pressmessage= ("return val " + returntxt1);
          },
        error(err) { console.error('Error: ' + err); },
        complete() { console.log('Completed'); }
      });

    }else{
      this.nameFormControl.markAsTouched();

    }
  }
}
