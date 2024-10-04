import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HouseListSortAndFilterStore } from '../../../stores/house-sort-and-filter.store';

@Component({
  selector: 'app-house-list-sort-and-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="container w-full">
      <div class="flex justify-between items-center w-full min-w-full">
        <div class="">
          <label class="label">
            <span class="label-text pr-2"
              >Scores
              <span class="text-xs"> (<= {{ store.scoreFilter() }})</span></span
            >

            <input
              #score
              type="range"
              [min]="1"
              [max]="12"
              class="range"
              [value]="store.scoreFilter()"
              step="1"
              (change)="store.setScoreFilter(score.valueAsNumber)"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text pr-2">Only Full Size Bars</span>
            <input
              type="checkbox"
              [checked]="store.hasFullSize()"
              (change)="store.toggleFullSize()"
              class="checkbox"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text pr-2">Only Good Vibes</span>
            <input
              type="checkbox"
              [checked]="store.hasAmbiance()"
              (change)="store.toggleAmbiance()"
              class="checkbox"
            />
          </label>
        </div>
        <div class="form-control flex flex-row">
          <span class="label pr-2">Sort By:</span>
          <label class="label"
            >Address:
            <input
              type="radio"
              name="sorting"
              class="radio"
              (change)="store.setSortBy('address')"
              [checked]="store.sortBy() === 'address'"
            />
          </label>
          <label class="label"
            >Rating:
            <input
              type="radio"
              name="sorting"
              class="radio"
              (change)="store.setSortBy('score')"
              [checked]="store.sortBy() === 'score'"
            />
          </label>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SortAndFilterComponent {
  store = inject(HouseListSortAndFilterStore);
}
