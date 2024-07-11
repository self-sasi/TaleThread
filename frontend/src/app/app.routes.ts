import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateComponent } from './pages/create/create.component';
import { ThreadsComponent } from './pages/threads/threads.component';
import { SavedComponent } from './pages/saved/saved.component';

export const routes: Routes = [
  {
    path : '',
    component : ProfileComponent
  },
  {
    path : 'create',
    component : CreateComponent
  },
  {
    path : 'threads',
    component : ThreadsComponent
  },
  {
    path : 'saved',
    component : SavedComponent
  },
];
