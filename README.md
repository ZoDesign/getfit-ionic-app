# GetFit – Ionic Fitness Application

GetFit is a **mobile fitness tracking application** developed using **Ionic, Angular, and TypeScript**, designed to provide users with a structured platform for discovering workout programmes, completing exercises, and monitoring their fitness progress.

The application implements a **component-based architecture**, reusable Angular services, client-side state management, persistent data storage, and Ionic's mobile-first UI framework to deliver a responsive and intuitive user experience across application views.

## Project Overview

Maintaining consistency within a fitness routine requires a simple and accessible way to organise workouts and monitor progress. GetFit was developed to address this by providing users with a centralised mobile interface for discovering workout programmes, accessing exercise information, recording completed workouts, and managing their progress over time.

The project demonstrates practical experience in **mobile application development, frontend architecture, user interface design, application state management, and data persistence** using the Angular and Ionic ecosystems.

---

## 1. Key Features

### ✓ User Authentication & Account Management

- User registration and login workflows.
- Client-side authentication state management.
- Persistent user session and account data.
- Form-based input handling using Ionic UI components.
- Structured validation and user interaction flows.

### ✓ Workout Programme Management

- Browse predefined workout programmes organised by fitness objectives, including:
  - Weight Loss
  - Muscle Gain
  - Cardio
  - General Fitness
- Workout data managed through a dedicated **Angular service layer**.
- Reusable Ionic list and interface components for programme presentation.
- Structured navigation between workout categories and individual programmes.

### ✓ Workout Details & Exercise Information

- Dedicated workout detail views for individual programmes.
- Displays:
  - Workout descriptions
  - Exercise lists
  - Workout duration
  - Required equipment
- Users can record completed workouts directly from the workout interface.
- Dynamic content rendering based on the selected workout programme.

### ✓ Progress Tracking

- Persistent tracking of completed workouts using **Ionic Storage**.
- Dedicated progress dashboard displaying user activity and achievements.
- Workout history maintained across application sessions.
- Functionality to reset progress when beginning a new training cycle.

### ✓ Application Navigation & User Interface

The application is structured into dedicated views for:

- Home
- Workouts
- Workout Details
- Progress
- Login
- Sign Up

Navigation is implemented using **Ionic Router**, while the interface combines Ionic's mobile UI components with custom **SCSS styling** to create a consistent and responsive application experience.

---

## 2. Technical Implementation

The application demonstrates several core software development concepts:

- **Component-based application architecture** using Angular.
- **Service-oriented data management** through Angular services.
- **Client-side state management** for user and workout information.
- **Persistent application data** using Ionic Storage.
- **Declarative routing** using Angular/Ionic Router.
- **Reusable UI components** using the Ionic component library.
- **Responsive mobile-first interface design**.
- **Type-safe development** using TypeScript.
- **Custom styling and UI refinement** using SCSS.

---

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| **Ionic Framework** | Cross-platform mobile UI and application development |
| **Angular** | Application architecture, components, services and routing |
| **TypeScript** | Type-safe application development |
| **Ionic Storage** | Persistent client-side application data |
| **HTML** | Application structure and content |
| **SCSS** | Responsive styling and interface customisation |

---

## 4. Running the Project

### Prerequisites

Ensure that **Node.js** and the **Ionic CLI** are installed.

### Install Ionic CLI

```bash
npm install -g @ionic/cli
```

### Clone the Repository

```bash
git clone <repository-url>
cd getfit-ionic-app
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
ionic serve
```

The application will be launched in the browser using Ionic's development server.

---

**Developed by:** Zolile Mahlangu
**Technologies:** Ionic · Angular · TypeScript · Ionic Storage · SCSS
