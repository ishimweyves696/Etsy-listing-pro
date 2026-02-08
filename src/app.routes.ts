
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { LandingComponent } from './pages/landing/landing.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' } // Fallback route to landing
];
