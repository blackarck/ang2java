import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {from} from 'rxjs';
//import 'rxjs/add/observable/fromPromise';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'ang2php';
  pressmessage ="";
  nameFormControl = new FormControl('', Validators.required);


  ngOnInit(){
    console.log("This is on ng init");
  }
  constructor() {
    console.log("This is constructor");
  }

  callmeAfter(){
    console.log(" I a being called after subscribe");
  }
  gotophp(){
    //only pass to java if value is present
    if(! this.nameFormControl.hasError('required')){
      console.log("Go to php");
      this.pressmessage="Going to fetch data from java";
      let messtxt="";
      // Create an Observable out of a promise
      const data = from(fetch('http://localhost:8080/lottoget'));
      // Subscribe to begin listening for async result
     /* data.subscribe({

        next(response){
          response.text().then((text)=>{
            console.log("text-"+text);
            this.pressmessage= "return val " + text;
          });
        },

        error(err) { console.error('Error: ' + err); },
        complete() { console.log('Completed'); }
      });
      */
      data.subscribe(resp=>{
        let txtmsg=""
        resp.text().then((text)=>{
          console.log("Thsi is text-" +text) ;
          txtmsg=text;
            this.pressmessage= "return val " + txtmsg;
        });

      });
    }else{
      this.nameFormControl.markAsTouched();

    }
  }
}
