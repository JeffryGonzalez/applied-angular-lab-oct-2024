import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map } from 'rxjs';
import { HouseEntity, HouseEntry } from '../stores';

@Injectable()
export class HouseApiService {
  #http = inject(HttpClient);

  addHouseToList(house: HouseEntry, tempId: string) {
    return this.#http
      .post<HouseEntity>('/api/houses', house)
      .pipe(map((r) => [r, tempId] as [HouseEntity, string]));
  }

  getHouseList() {
    return this.#http.get<HouseEntity[]>('/api/houses');
  }
}
