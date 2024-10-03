import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HouseListStore } from '../../stores/house-list.store';
import { JsonPipe } from '@angular/common';
import { HouseListItemComponent } from './components/house-list-item';
import { RouterOutlet } from '@angular/router';
import { SortAndFilterComponent } from './components/sort-and-filter.component';

@Component({
  selector: 'app-house-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    HouseListItemComponent,
    RouterOutlet,
    SortAndFilterComponent,
  ],
  template: `
    <div>
      <app-house-list-sort-and-filter />

      <ul class="flex flex-row flex-wrap gap-4">
        @for(item of store.getHouseListModel(); track item.id) {
        <app-house-list-item [item]="item" />
        }
      </ul>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class HouseListComponent {
  store = inject(HouseListStore);
}
