import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';

type ApiResourceStates = 'idle' | 'pending' | 'fulfilled' | 'error';
interface UserState {
  userName: string;
  status: ApiResourceStates;
}
const initialState: UserState = {
  userName: '',
  status: 'idle',
};
export const UserStore = signalStore(
  withState(initialState),
  withDevtools('user-store'),
  withMethods((store) => {
    // this is an injection context.
    const client = inject(HttpClient);
    return {
      _logInUser: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { status: 'pending' })),
          switchMap(() =>
            client.get<{ sub: string }>('/api/user-info').pipe(
              map((r) => ({ userName: r.sub })),
              tapResponse({
                next: (response) => {
                  patchState(store, {
                    userName: response.userName,
                    status: 'fulfilled',
                  });
                },
                error: () => {
                  // log it, send a message to another api that we've got a hoxx0r here
                  patchState(store, { userName: '', status: 'error' });
                },
              })
            )
          )
        )
      ),
    };
  }),

  withComputed((store) => {
    return {
      userLoggedIn: computed(() => store.userName() !== ''),
    };
  }),
  withHooks((store) => {
    return {
      onInit() {
        store._logInUser();
      },
    };
  })
);
