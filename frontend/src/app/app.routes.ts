import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateComponent } from './pages/create/create.component';
import { ThreadsComponent } from './pages/threads/threads.component';
import { SavedComponent } from './pages/saved/saved.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { LandingComponent } from './views/landing/landing.component';
import { authGuard } from './guards/src/app/guards/auth.guard';
import { ElseprofileComponent } from './pages/elseprofile/elseprofile.component';
import { GuideComponent } from './pages/guide/guide.component';

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
        path : 'threads',
        component : ThreadsComponent,
        canActivate : [authGuard]
      },
      {
        path : 'create',
        component : CreateComponent,
        canActivate : [authGuard]
      },
      {
        path : 'saved',
        component : SavedComponent,
        canActivate : [authGuard]
      },
      {
        path : 'user',
        component : ElseprofileComponent,
        canActivate : [authGuard]
      },
      {
        path : 'guide',
        component : GuideComponent,
        canActivate : [authGuard]
      }
    ]
  },

];
