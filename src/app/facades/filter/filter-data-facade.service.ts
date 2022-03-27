import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-reducer';
import { SetSelectedNoteLabel, UpdateWeekNumber } from 'src/app/store/filter/filter-data.action';
import { filterDataQuery } from 'src/app/store/filter/filter-data.selector';

@Injectable({
  providedIn: 'root'
})
export class FilterDataFacadeService {

  constructor(private store: Store<AppState>) { }

  weekNumber$ = this.store.pipe(select(filterDataQuery.getWeekNumber));
  selectNoteLabels$ = this.store.pipe(select(filterDataQuery.getSelectedNoteLabels));
  noteLabels$ = this.store.pipe(select(filterDataQuery.getNoteLabelsList));
  isIncrementWeekNumberDisabled$ = this.store.pipe(select(filterDataQuery.isIncrementWeekNumberDisabled));
  isDecrementWeekNumberDisabled$ = this.store.pipe(select(filterDataQuery.isDecrementWeekNumberDisabled));


  public updateDayOfWeek(addedValue) {
    this.store.dispatch(new UpdateWeekNumber(addedValue));
  }

  public setSelectedNoteLabel(labelId: number) {
    this.store.dispatch(new SetSelectedNoteLabel(labelId));
  }

}
