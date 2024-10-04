import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HouseListStore } from '../../stores/house-list.store';
import { HouseListItemComponent } from './components/house-list-item';
import { SortAndFilterComponent } from './components/sort-and-filter.component';

@Component({
  selector: 'app-house-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HouseListStore],
  imports: [HouseListItemComponent, RouterOutlet, SortAndFilterComponent],
  template: `
    <div>
      <app-house-list-sort-and-filter />
      <ul class="flex flex-row flex-wrap gap-4">
        @for(item of store.getHouseListModel(); track item.id) {
        <app-house-list-item [item]="item" />
        } @empty {
        <p>No Houses Meet Your Sorting Criteria Above.</p>
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
