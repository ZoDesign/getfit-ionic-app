import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramCompletion, ProgressTrackingService } from 'src/services/progress-tracking.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/app/model/fitness';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ProgressPage implements OnInit {
  workoutsCompleted = 0;
  workoutHistory: ProgramCompletion[] = [];
  
  constructor(
    private progressTracker: ProgressTrackingService,
    private userService: UserService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadProgressData();
  }

  async loadProgressData() {
    this.workoutsCompleted = this.progressTracker.getCompletionCount();
    this.workoutHistory = await this.progressTracker.getDetailedCompletionHistory();
  }

  async showResetPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Progress',
      message: 'Are you sure you want to reset all your workout progress? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            this.resetProgress();
          }
        }
      ]
    });

    await alert.present();
  }

  async resetProgress() {
    if (await this.progressTracker.resetAllProgress()) {
      this.workoutsCompleted = 0;
      this.workoutHistory = [];
    }
  }

  isUserLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}
