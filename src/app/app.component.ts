import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang2php';
  pressmessage ="";

  constructor() {
    console.log("This is constructor");
  }

  ngOnInit(){
    console.log("This is on ng init");
  }

 gotophp(){
    console.log("Go to php");
    this.pressmessage="Going to fetch data from php";
  }
}
