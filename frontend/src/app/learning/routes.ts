import { Routes } from '@angular/router';
import { LearningComponent } from './learning.component';
import { GolfComponent } from './pages/golf/golf.component';

export const LEARNING_ROUTES: Routes = [
  {
    path: 'learning',
    component: LearningComponent,
    children: [
      {
        path: 'golf',
        component: GolfComponent,
      },
    ],
  },
];
