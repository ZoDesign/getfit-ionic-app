import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qoutes',
  templateUrl: './qoutes.page.html',
  styleUrls: ['./qoutes.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]  // Ensure IonicModule is in imports array
})
export class QoutesPage {
  userService: any;
  router: any;
  
  
  //memberService: any;
  //router: any;

  //quotes = [
    //{ text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
    //{ text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    //{ text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  //];

  constructor() { }


}
