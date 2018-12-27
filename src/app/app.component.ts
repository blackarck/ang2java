import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
//import { PersistenceService ,StorageType} from 'angular-persistence';
import {from} from 'rxjs';
import {lottoissue} from './lottoissue';
import {MatTableDataSource} from '@angular/material';
import { environment } from '../environments/environment';
//import 'rxjs/add/observable/fromPromise';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  checked = false;
  title = 'ang2php';
  pressmessage ="";
  nameFormControl = new FormControl('', Validators.required);
  buyCboxControl = new FormControl();
  captchaDone:boolean=true;
  disvalue="disabled";
  lottoval:lottoissue[];
  lottostr:String[];
  //displayedColumns: string[] = ['name', 'lottono', 'issuedt', 'status'];
  dataSource: MatTableDataSource<any>;
 //persistenceService: PersistenceService;

  resolved(captchaResponse: string) {
        // console.log(`Resolved captcha with response ${captchaResponse}:`);
         this.captchaDone=false;
         this.disvalue="";
         this.checked = false;
     }

     resolved1=function(){
      // console.log("resolved1"  );
     }

  ngOnInit(){
    //console.log("This is on ng init");

  }
//  constructor(private persistenceService: PersistenceService) {
constructor(){
    //console.log("This is constructor");
  }

captchapress(){
  //console.log(" capctha was pressed");
}
  callmeAfter(){
    //console.log(" I a being called after subscribe");
  }
  gotophp(){
    //only pass to java if value is present
    grecaptcha.reset();
    this.captchaDone=true;
    this.checked = false;
    if(! this.nameFormControl.hasError('required')){
    //  this.persistenceService.set('logid', ""+ this.nameFormControl.value, {type: StorageType.SESSION});
      //console.log("Go to php-" + this.nameFormControl.value + " buy-"+ this.buyCboxControl.value) ;
      //console.log("Retrieve value " +   this.persistenceService.get('logid',StorageType.SESSION));
      //this.pressmessage="Going to fetch data from java";
      // Create an Observable out of a promise
      const data = from(
        fetch(environment.callApiUrl + '/api?persname='+this.nameFormControl.value +'&buyval='+this.buyCboxControl.value,{
          mode:"cors",
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        })

      );
      //const data = from(fetch('http://127.0.0.1:8080/api?persname='+this.nameFormControl.value +'&buyval='+this.buyCboxControl.value));


      // Subscribe to begin listening for async result
      data.subscribe(resp=>{

    /*    let txtmsg="";
        resp.text().then(text=>{
          console.log("Thsi is text-" +text) ;
            this.pressmessage= "return val " + txtmsg;
        });
*/

      resp.json().then(body=>{
        //console.log("fetching data "+ body );
        this.lottoval=body as lottoissue[];
      //  this.dataSource = new MatTableDataSource(this.lottoval);
      });


      },
     err=>{
       console.log("error "+err);
     });
    }else{
      this.nameFormControl.markAsTouched();

    }
  }
}
