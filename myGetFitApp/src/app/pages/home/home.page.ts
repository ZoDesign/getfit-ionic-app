import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProgressTrackingService } from 'src/services/progress-tracking.service';
import { User } from '../../model/fitness';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit {
  userData: User | null = null;
  finishedWorkouts = 0;

  constructor(
    private userService: UserService,
    private progressTracker: ProgressTrackingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeUserData();
  }

  subscribeUserData() {
    this.userService.activeUser.subscribe(user => {
      this.userData = user;
    });
  }

  ionViewWillEnter() {
    // Update workout count when view is entered
    this.updateWorkoutCount();
  }

  updateWorkoutCount() {
    this.finishedWorkouts = this.progressTracker.getCompletionCount();
  }

  goToWorkouts() {
    this.router.navigate(['/workout-list']);
  }

  goToProgress() {
    this.router.navigate(['/progress']);
  }

  goToQoutes() {
    this.router.navigate(['/qoutes']);
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}
