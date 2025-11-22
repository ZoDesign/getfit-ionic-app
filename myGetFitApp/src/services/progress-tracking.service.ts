import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FitnessService } from './fitness.service';
import { UserService } from './user.service';
import { FitnessProgram, ActivityTracking } from 'src/app/model/fitness';

export interface ProgramCompletion {
  trackingData: ActivityTracking;
  programDetails: FitnessProgram;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackingService {
  private completionsSubject = new BehaviorSubject<ActivityTracking[]>([]);
  
  constructor(
    private fitnessService: FitnessService,
    private userService: UserService
  ) {
    this.refreshCompletionHistory();
  }
  
  
  async refreshCompletionHistory() {
    const activeUser = this.userService.getActiveUser();
    if (activeUser) {
      const history = await this.fitnessService.retrieveActivityHistory(activeUser.uid);
      this.completionsSubject.next(history);
    } else {
      this.completionsSubject.next([]);
    }
  }
  
   // Returns an workout program of the user's activity history 
  getCompletionHistory(): Observable<ActivityTracking[]> {
    return this.completionsSubject.asObservable();
  }
  
  // Returns the total number of completed programs
  getCompletionCount(): number {
    return this.completionsSubject.value.length;
  }
  

  // Checks if the currently active user has completed a specific program
  isProgramCompleted(programId: string): boolean {
    const activeUser = this.userService.getActiveUser();
    if (!activeUser) return false;
    
    return this.completionsSubject.value.some(
      record => record.programId === programId && record.userId === activeUser.uid
    );
  }
  
   // Marks a specific program as completed by the active user
  async markProgramCompleted(programId: string): Promise<boolean> {
    const activeUser = this.userService.getActiveUser();
    if (!activeUser) return false;
    
    const success = await this.fitnessService.recordActivity(programId, activeUser.uid);
    if (success) {
      await this.refreshCompletionHistory();
    }
    return success;
  }
  
  // Resets all progress (history) for the active user and refreshes the completion history
  async resetAllProgress(): Promise<boolean> {
    const activeUser = this.userService.getActiveUser();
    if (!activeUser) return false;
    
    const success = await this.fitnessService.clearHistory(activeUser.uid);
    if (success) {
      await this.refreshCompletionHistory();
    }
    return success;
  }
  
   // Retrieves detailed program completion history with the program details
  async getDetailedCompletionHistory(): Promise<ProgramCompletion[]> {
    const history = this.completionsSubject.value;
    const detailedHistory: ProgramCompletion[] = [];
    
     // For each record in the history, fetch the corresponding program details and combine them
    for (const record of history) {
      const program = await this.fitnessService.findProgramById(record.programId);
      if (program) {
        detailedHistory.push({
          trackingData: record,
          programDetails: program
        });
      }
    }
    
    return detailedHistory;
  }
}
