import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Anica Barrios | Full Stack Web Developer' 
  },
  // Redirect any unknown routes to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];