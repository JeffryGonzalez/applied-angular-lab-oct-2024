import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { HouseSortAndFilterStore } from '../../../stores/sort-and-filter.store';
import { HouseListStore } from '../../../stores/house-list.store';

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
            <input type="text" />
            <!-- <input
              #score
              type="range"
              [min]="lowestScore()"
              [max]="highestScore()"
              class="range"
              step="1"
              (change)="store.setScoreFilter(score.valueAsNumber)"
            /> -->
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
              (change)="store.setSortByAddress()"
              [checked]="store.sortBy() === 'address'"
            />
          </label>
          <label class="label"
            >Rating:
            <input
              type="radio"
              name="sorting"
              class="radio"
              (change)="store.setSortByScore()"
              [checked]="store.sortBy() === 'score'"
            />
          </label>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SortAndFilterComponent implements OnInit {
  store = inject(HouseSortAndFilterStore);
  listStore = inject(HouseListStore);

  highestScore = computed(() => this.listStore.getAllScores()[0] || 0);
  lowestScore = computed(() => {
    const idx = this.listStore.getAllScores().length - 1;
    return this.listStore.getAllScores()[idx - 1];
  });
  ngOnInit(): void {
    this.store.setScoreFilter(this.highestScore());
  }
}
