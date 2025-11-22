import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FitnessService } from 'src/services/fitness.service';
import { FitnessProgram } from 'src/app/model/fitness';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class WorkoutListPage implements OnInit {
  allWorkouts: FitnessProgram[] = [];
  displayedWorkouts: FitnessProgram[] = [];
  availableTypes: string[] = [];
  
  constructor(
    private fitnessService: FitnessService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.fetchWorkouts();
  }

  async fetchWorkouts() {
    try {
      // Fetch workouts from service
      this.allWorkouts = await this.fitnessService.retrieveAllPrograms();
      
      // Initialize displayed workouts with all workouts
      this.displayedWorkouts = [...this.allWorkouts];
      
      // Generate unique workout types
      this.generateWorkoutTypes();
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  generateWorkoutTypes() {
    // Create a unique set of workout types
    const typeCollection = new Set<string>();
    
    // Add each workout type to the set
    this.allWorkouts.forEach(workout => {
      if (workout.category) {
        typeCollection.add(workout.category);
      }
    });
    
    // Convert set to array
    this.availableTypes = Array.from(typeCollection);
  }

  handleTypeChange(event: any) {
    const typeFilter = event.detail.value;
    
    // Reset to all workouts if "All" is selected
    if (typeFilter === 'All') {
      this.displayedWorkouts = [...this.allWorkouts];
      return;
    }
    
    // Filter workouts by selected type
    this.displayedWorkouts = this.allWorkouts.filter(
      workout => workout.category === typeFilter
    );
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}
