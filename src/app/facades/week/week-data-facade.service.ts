import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-reducer';
import { weekDataQuery } from 'src/app/store/week/week-data.selector';

@Injectable({
  providedIn: 'root'
})
export class WeekDataFacadeService {

  constructor(private store: Store<AppState>) { }

  daysListPerWeek$ = this.store.pipe(select(weekDataQuery.getDaysListPerWeek));
  minStartDate$ = this.store.pipe(select(weekDataQuery.loadMinStartDate));
  maxStartDate$ = this.store.pipe(select(weekDataQuery.loadMaxStartDate));

}
