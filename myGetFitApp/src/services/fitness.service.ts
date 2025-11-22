import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FitnessProgram, ActivityTracking } from 'src/app/model/fitness';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private readonly ACTIVITY_HISTORY_KEY = 'activity_history';

  private fitnessPrograms: FitnessProgram[] = [
    {
      uid: 'W1',
      title: 'Cardio Blast Routine',
      category: 'Cardio',
      summary: 'A fast-paced cardio routine designed to boost heart rate and improve endurance.',
      coverImage: 'assets/3.jpeg',
      timeFrame: 30,
      intensityLevel: 'Beginner',
      gear: ['None'],
      activityElements: [
        {
          uid: 'W101',
          title: 'Jumping Jacks',
          timeFrame: 60,
          gear: [],
          steps: 'Start standing, then jump your feet wide while raising your arms overhead, then return to starting position.'
        },
        {
          uid: 'W102',
          title: 'High Knees',
          timeFrame: 30,
          gear: [],
          steps: 'Run in place, lifting each knee to waist height as quickly as possible.'
        },
        {
          uid: 'W103',
          title: 'Mountain Climbers',
          timeFrame: 30,
          gear: [],
          steps: 'Start in a plank position, quickly alternate bringing each knee towards your chest, simulating a running motion.'
        },
        {
          uid: 'W104',
          title: 'Butt Kicks',
          timeFrame: 30,
          gear: [],
          steps: 'Run in place, kicking your heels up towards your glutes, alternating legs at a fast pace.'
        },
        {
          uid: 'W105',
          title: 'Burpees',
          timeFrame: 45,
          gear: [],
          steps: 'Begin standing, squat down, place hands on the ground, jump your feet back into a plank, do a push-up, then jump your feet forward and jump up.'
        }
      ],
      workout: ''
    },
    {
      uid: 'W2',
      title: 'Strength Builder Basics',
      category: 'Strength Training',
      summary: 'Build foundational strength and mass through resistance workouts.',
      coverImage: 'assets/2.jpg',
      timeFrame: 45,
      intensityLevel: 'Intermediate',
      gear: ['Bench', 'Bar', 'Plates'],
      activityElements: [
        {
          uid: 'W104',
          title: 'Chest Press',
          groupCount: 4,
          repetitions: 8,
          gear: ['Bench', 'Bar', 'Plates'],
          steps: 'Recline on bench, grip bar, lower to chest level, then press upward.',
          timeFrame: 0
        },
        {
          uid: 'W105',
          title: 'Hip Hinge Lifts',
          groupCount: 4,
          repetitions: 8,
          gear: ['Bar', 'Plates'],
          steps: 'Stand with feet hip-width apart, bend at hips to grip bar, lift by extending hips and knees.',
          timeFrame: 0
        },
        {
          uid: 'W106',
          title: 'Vertical Pulls',
          groupCount: 3,
          repetitions: 10,
          gear: ['Pull Bar'],
          steps: 'Hang from bar with palms forward, pull body up until chin clears bar, then lower back down.',
          timeFrame: 0
        }
      ],
      workout: ''
    },
    {
      uid: 'W3',
      title: 'Cardio Endurance Blast',
      category: 'Cardio',
      summary: 'Boost your stamina and elevate your heart rate with this dynamic cardio set.',
      coverImage: 'assets/1.jpg',
      timeFrame: 30,
      intensityLevel: 'Intermediate',
      gear: ['None'],
      activityElements: [
        {
          uid: 'W107',
          title: 'High Knees',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Jog in place while lifting your knees as high as possible, alternating quickly between legs.'
        },
        {
          uid: 'W108',
          title: 'Jump Squat Burpees',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Start standing, squat down, place hands on the floor, jump feet back into plank, perform a push-up, then jump feet forward and explosively jump up.'
        },
        {
          uid: 'W109',
          title: 'Mountain Climbers',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Start in plank position, quickly alternate bringing each knee toward your chest in a running motion.'
        }
      ],
      workout: ''
    },
    {
      uid: 'W4',
      title: 'Flow for Mobility & Balance',
      category: 'Mobility & Stretch',
      summary: 'Boost mobility and body awareness with calming sequences.',
      coverImage: 'assets/4.jpg',
      timeFrame: 40,
      intensityLevel: 'Beginner',
      gear: ['Exercise Mat'],
      activityElements: [
        {
          uid: 'W110',
          title: 'Inverted V Stretch',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Begin on hands and knees, elevate hips upward and back to form a triangular shape.'
        },
        {
          uid: 'W111',
          title: 'Standing Extension',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Step one foot backward, bend front knee, raise arms overhead while keeping back straight.'
        },
        {
          uid: 'W112',
          title: 'Restorative Rest',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Kneel with knees apart, sit back on heels, stretch arms forward and rest forehead on mat.'
        }
      ],
      workout: ''
    },

    {
      uid: 'W5',
      title: 'Total Body Strength Circuit',
      category: 'Strength Training',
      summary: 'A full-body workout designed to build muscle and strength.',
      coverImage: 'assets/5.jpeg',
      timeFrame: 40,
      intensityLevel: 'Intermediate',
      gear: ['Dumbbells', 'Resistance Bands'],
      activityElements: [
        {
          uid: 'W501',
          title: 'Dumbbell Squats',
          groupCount: 3,
          repetitions: 12,
          gear: ['Dumbbells'],
          steps: 'Hold a dumbbell in each hand, squat down keeping your chest up, then return to standing.',
          timeFrame: 0
        },
        {
          uid: 'W502',
          title: 'Chest Press',
          groupCount: 3,
          repetitions: 10,
          gear: ['Dumbbells'],
          steps: 'Lie on a bench, press the dumbbells from chest height to fully extended arms.',
          timeFrame: 0
        },
        {
          uid: 'W503',
          title: 'Resistance Band Rows',
          groupCount: 3,
          repetitions: 15,
          gear: ['Resistance Bands'],
          steps: 'Hold the bands, step back, and pull the bands towards your torso while squeezing your shoulder blades together.',
          timeFrame: 0
        }
      ],
      workout: ''
    },

    {
      uid: 'W6',
      title: 'Morning Stretch & Flex Routine',
      category: 'Mobility & Stretch',
      summary: 'A gentle routine to wake up and improve flexibility and mobility.',
      coverImage: 'assets/6.jpeg',
      timeFrame: 20,
      intensityLevel: 'Beginner',
      gear: ['Yoga Mat'],
      activityElements: [
        {
          uid: 'W601',
          title: 'Downward Dog',
          timeFrame: 60,
          gear: [],
          steps: 'Start in plank position, lift hips high, forming an inverted V shape, then hold.'
        },
        {
          uid: 'W602',
          title: 'Cat-Cow Stretch',
          timeFrame: 60,
          gear: [],
          steps: 'In a tabletop position, arch your back (cat), then drop your belly towards the floor (cow).'
        },
        {
          uid: 'W603',
          title: 'Seated Forward Fold',
          timeFrame: 60,
          gear: [],
          steps: 'Sit with legs extended, reach forward with a flat back, and hold the position.'
        }
      ],
      workout: ''
    },

    {
      uid: 'W7',
      title: 'Cardio Sprint Challenge',
      category: 'Cardio',
      summary: 'Boost your heart rate with this high-energy sprint and plyometric circuit.',
      coverImage: 'assets/7.jpeg',
      timeFrame: 30,
      intensityLevel: 'Advanced',
      gear: ['None'],
      activityElements: [
        {
          uid: 'W701',
          title: 'Mountain Climbers',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Start in a plank position. Bring one knee toward your chest, then quickly switch legs, mimicking a climbing motion.'
        },
        {
          uid: 'W702',
          title: 'Jump Squats',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Stand with feet shoulder-width apart. Squat down, then explosively jump upwards and land softly back into a squat.'
        },
        {
          uid: 'W703',
          title: 'Sprint Intervals',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Run at full speed for 30 seconds, then walk for 30 seconds to recover, repeating for the entire minute.'
        }
      ],
      workout: ''
    }


  ]; 




  constructor() {}
  //Method to retieve all programs
  async retrieveAllPrograms(): Promise<FitnessProgram[]> {
    return [...this.fitnessPrograms]; // Return a copy
  }


  //Retieve a program by ID
  async findProgramById(uid: string): Promise<FitnessProgram | undefined> {
    return this.fitnessPrograms.find(program => program.uid === uid);
  }

  //Retieve Program by Category
  async findProgramsByCategory(category: string): Promise<FitnessProgram[]> {
    return this.fitnessPrograms.filter(program => program.category === category);
  }

  
  async retrieveActivityHistory(userId: string): Promise<ActivityTracking[]> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      const allActivityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];
      return allActivityHistory.filter(record => record.userId === userId);
    } catch (error) {
      console.error('Failed to retrieve activity history:', error);
      return [];
    }
  }


  // Mark a workout as completed
  async recordActivity(programId: string, userId: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      const activityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];

      const newActivity: ActivityTracking = {
        programId,
        completionTime: new Date().toISOString(),
        userId,
        progress: ''
      };

      activityHistory.push(newActivity);
      await Preferences.set({
        key: this.ACTIVITY_HISTORY_KEY,
        value: JSON.stringify(activityHistory)
      });

      return true;
    } catch (error) {
      console.error('Failed to record activity:', error);
      return false;
    }
  }

  //Reset the history of workouts completed
  async clearHistory(userId: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      let activityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];

      activityHistory = activityHistory.filter(activity => activity.userId !== userId);

      await Preferences.set({
        key: this.ACTIVITY_HISTORY_KEY,
        value: JSON.stringify(activityHistory)
      });

      return true;
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }
}
