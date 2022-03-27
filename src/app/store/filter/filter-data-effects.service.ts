import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app-reducer';
import { FilterDataActionTypes, UpdateWeekNumber, UpdateWeekNumberFailure, UpdateWeekNumberSuccess } from './filter-data.action';

@Injectable({
  providedIn: 'root'
})
export class FilterDataEffectsService {


  @Effect() updateWeekNumber$ =
    this.actions$.pipe(
      ofType<UpdateWeekNumber>(FilterDataActionTypes.UPDATE_WEEK_NUMBER),
      switchMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.select((store: AppState) => store.weekData.maxWeekNumber),
            this.store.select((store: AppState) => store.weekData.minWeekNumber),
            this.store.select((store: AppState) => store.filterData.weekNumber),
          ),
          map(([action, maxWeekNumber, minWeekNumber, weekNumber]) => {
            if (action.payload < 0 && minWeekNumber <= weekNumber + action.payload) {
              return new UpdateWeekNumberSuccess(weekNumber + action.payload);
            } else if (action.payload > 0 && weekNumber + action.payload <= maxWeekNumber) {
              return new UpdateWeekNumberSuccess(weekNumber + action.payload);
            }
            return new UpdateWeekNumberFailure(new Error("Can not update week number"));
          })
        )))

  constructor(
    private actions$: Actions,
    private store: Store
  ) { }

}
