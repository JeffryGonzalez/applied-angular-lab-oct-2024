import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './pages/counter/counter.component';
import { CounterStore } from './pages/counter/components/counter/counter.store';
import { CounterUiComponent } from './pages/counter/components/counter/counter-ui.component';
import { CounterPrefsComponent } from './pages/counter/components/prefs/prefs.component';
import { CounterPrefsStore } from './pages/counter/components/prefs/counter-prefs.store';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    component: LabsComponent,
    children: [
      {
        path: 'counter',
        component: CounterComponent,
        providers: [CounterStore, CounterPrefsStore],
        children: [
          {
            path: 'ui',
            component: CounterUiComponent,
          },
          {
            path: 'prefs',
            component: CounterPrefsComponent,
          },
          {
            path: '**',
            redirectTo: 'ui',
          },
        ],
      },
    ],
  },
];
