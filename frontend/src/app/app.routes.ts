import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateComponent } from './pages/create/create.component';
import { ThreadsComponent } from './pages/threads/threads.component';
import { SavedComponent } from './pages/saved/saved.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { LandingComponent } from './views/landing/landing.component';
import { authGuard } from './guards/src/app/guards/auth.guard';

export const routes: Routes = [
  {
    path : '',
    component : LandingComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : '',
    component : MainComponent,
    children : [
      {
        path : 'profile',
        component : ProfileComponent,
        canActivate : [authGuard]
      },
      {
        path : 'create',
        component : CreateComponent,
        canActivate : [authGuard]
      },
      {
        path : 'threads',
        component : ThreadsComponent,
        canActivate : [authGuard]
      },
      {
        path : 'saved',
        component : SavedComponent,
        canActivate : [authGuard]
      }
    ]
  },

];
