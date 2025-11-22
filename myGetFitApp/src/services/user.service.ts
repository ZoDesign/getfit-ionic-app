import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/model/fitness';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERS_REGISTRY_KEY = 'fitness_users_registry';
  private readonly ACTIVE_USER_KEY = 'active_user';
  
  private activeUserSubject = new BehaviorSubject<User | null>(null);
  public activeUser = this.activeUserSubject.asObservable();

  constructor() {
    this.loadActiveUser();
    this.initializeDefaultUsers();
   }

   private async initializeDefaultUsers() {
    const usersList = await this.getUsersRegistry();
    if (usersList.length === 0) {
      // Add a sample user for testing
      const testUser: User = {
        uid: 'user1',
        emailAddress: 'demo@fitnessapp.com',
        displayName: 'Demo User',
        credentials: 'demo123456'
      };
      await this.saveUsersRegistry([testUser]);
      console.log('Demo user created for testing');
    }
  }

  async loadActiveUser() {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVE_USER_KEY });
      if (value) {
        this.activeUserSubject.next(JSON.parse(value));
      }
    } catch (error) {
      console.error('Failed to load active user:', error);
    }
  }
  
  async getUsersRegistry(): Promise<User[]> {
    try {
      const { value } = await Preferences.get({ key: this.USERS_REGISTRY_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Failed to retrieve users registry:', error);
      return [];
    }
  }
  
  async saveUsersRegistry(users: User[]): Promise<void> {
    try {
      await Preferences.set({
        key: this.USERS_REGISTRY_KEY,
        value: JSON.stringify(users)
      });
    } catch (error) {
      console.error('Failed to save users registry:', error);
    }
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    try {
      const users = await this.getUsersRegistry();
      const user = users.find(u => 
        u.emailAddress.toLowerCase() === email.toLowerCase() && u.credentials === password
      );

      if (user) {
        this.activeUserSubject.next(user);
        await Preferences.set({
          key: this.ACTIVE_USER_KEY,
          value: JSON.stringify(user)
        });
        console.log('User authenticated:', user);
        return true;
      }
      
      console.log('Authentication failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async register(email: string, name: string, password: string): Promise<boolean> {
    try {
      const users = await this.getUsersRegistry();
      
      if (users.some(u => u.emailAddress.toLowerCase() === email.toLowerCase())) {
        console.log('Email already registered');
        return false;
      }

      const newUser: User = {
        uid: Date.now().toString(),
        emailAddress: email,
        displayName: name,
        credentials: password
      };

      users.push(newUser);
      await this.saveUsersRegistry(users);
      
      this.activeUserSubject.next(newUser);
      await Preferences.set({
        key: this.ACTIVE_USER_KEY,
        value: JSON.stringify(newUser)
      });
      
      console.log('User registration successful:', newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  async signOut() {
    try {
      this.activeUserSubject.next(null);
      await Preferences.remove({ key: this.ACTIVE_USER_KEY });
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  getActiveUser(): User | null {
    return this.activeUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.activeUserSubject.value;
  }
  
  async getAllUsers(): Promise<User[]> {
    return this.getUsersRegistry();
  }

}
